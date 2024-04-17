import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => { 
    const [productList, setProductList] = useState([])
    const fetchData = async () => {
        const res = await axios("https://fakestoreapi.in/api/products")
        // console.log(res.data.products)
        const {products} = await res.data
        setProductList(products)
        console.log(productList)

    }
    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div className='px-14 py-5'>
        <h1 className='text-2xl font-semibold mb-5'>Product List ({productList.length})</h1>
        <div className='grid grid-cols-5'>
            {
                productList.map((product)=>{
                    return <Link key={product.id} to={`/products/${product.id}`}>
                        <div  className='w-56 h-72 border px-2 my-2 rounded-lg'>
                        <div className='w-40 h-40 mx-auto'>
                            <img src={product.image} alt="" className='w-full h-full object-cover'/>
                        </div>
                        <div className='my-2 px-1'>
                            <h1 className='text-base line-clamp-2'>{product.title}</h1>
                            <h1 className='my-1 text-sm text-black/[0.7] capitalize'>{product.brand}</h1>
                            <h1 className='text-2xl font-semibold'>₹ {Number(product.price) * 80} </h1>
                        </div>
                    </div>
                    </Link>
                })
            }
        </div>
    </div>
  )
}

export default Products