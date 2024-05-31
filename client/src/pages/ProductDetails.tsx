import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Product, ProductParams } from "../types";
import { useParams } from "react-router-dom";
import axios from "axios";
import storeImg from "../assets/gadget_store.png";
import { PiShoppingCart } from 'react-icons/pi';




const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams<ProductParams>();
  const [loading,setLoading] = useState<boolean>(false)

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`https://fakestoreapi.in/api/products/${productId}`);
      const product: Product = res.data.product;
      setProduct(product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    } 
  }, [productId]);

  

  return (
    <div>
      {!product ? (
        <div className="w-full h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <img src={storeImg} className="w-16 h-10 opacity-90 animate-pulse" alt="Store" />
        </div>
      </div>
      ) : (
        <div>
          <Navbar />
          <div className="px-14 py-5">
            <div className="flex">
              <div className="w-2/4 h-96 mr-4 my-2">
                <img
                  src={product.image}
                  className="w-full h-full object-contain"
                  alt={product.title}
                />
              </div>
              <div className="w-2/4">
                <h1 className="my-2 text-xl">{product.title}</h1>
                <h1 className="my-1 text-lg text-black/[0.7] capitalize">
                  {product.brand}
                </h1>
                <div>
                  {product.discount ? (
                    <div className="my-1 flex items-center gap-2">
                      <span className="text-3xl font-medium">
                        ₹{" "}
                        {Number(
                          Math.floor(
                            (product.price * 100) / (100 - product.discount)
                          )
                        ) * 80}
                      </span>
                      <span className="text-xl line-through">
                        {Number(product.price) * 80}
                      </span>
                      <span className="text-xl text-green-600">
                        {product.discount}% off
                      </span>
                    </div>
                  ) : (
                    <h1 className="text-3xl font-medium">
                      {Number(product.price) * 80}
                    </h1>
                  )}
                </div>
                <button className="flex items-center gap-2 my-2 px-4 py-2 text-xl bg-black rounded-lg text-white">
                  <PiShoppingCart className="text-2xl"/>Add to Cart
                </button>
                <hr className="my-4 "/>
                <h1 className="my-1 text-black/[0.9]">
                  Description : {product.description}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
