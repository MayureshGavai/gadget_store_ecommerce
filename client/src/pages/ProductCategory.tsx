import React, { Fragment, useEffect, useState } from 'react'
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SlArrowDown } from "react-icons/sl";
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { LuListFilter } from "react-icons/lu";
import { Product } from '../types';


type Props = {}

const ProductCategory = (props: Props) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const { categoryName } = useParams<{ categoryName: string }>();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const fetchData = async () => {
    const res = await axios(
      `https://fakestoreapi.in/api/products/category?type=${categoryName}`
    );
    const products: Product[] = await res.data.products;  
    setProductList(products);
    const uniqueBrands : string[] = [...new Set(products.map((product: Product) => product.brand))];
    setBrands(uniqueBrands);
  };

  useEffect(() => {
    fetchData();
  }, [categoryName]);

  const handleBrandFilter = (brand: string) => {
    const index = selectedBrands.indexOf(brand);
    if (index === -1) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(item => item !== brand));
    }
  };

  const handlePriceRangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([parseInt(e.target.value), priceRange[1]]);
  };
  
  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy)
  }

  const filteredProducts = productList.filter((product: Product) => {
    // Filter by selected brands
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    // Filter by price range
    const productPrice = Number(product.price) * 80; // Convert to desired currency
    return productPrice >= priceRange[0] && productPrice <= priceRange[1];
  });

  const sortedProducts = filteredProducts.sort((a: Product, b: Product) => {
    switch(sortBy){
      case "lowToHigh" :
        return Number(a.price) - Number(b.price)
      case "highToLow" : 
        return Number(b.price) - Number(a.price)
      default : 
        return 0
    }
  })
  return (
    <div>
      <Navbar />
      <div className="px-14 py-5">
        <div className="w-full mb-3 flex justify-between items-end">
          <div className="flex flex-col">
            <h1 className="text-base line-clamp-0">Results for</h1>
            <h1 className="text-2xl font-semibold capitalize">
              {categoryName} ({filteredProducts.length})
            </h1>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <button
              onClick={toggleFilters}
              className="flex items-center gap-2 px-2 py-1 border border-black rounded-md hover:bg-black hover:text-white"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              <LuListFilter />
            </button>
            <Menu as="div" className="relative inline-block text-left">
            <div>
          <MenuButton className="flex items-center gap-2 px-2 py-1 border border-black rounded-md hover:bg-black hover:text-white">
              Sort by
            <SlArrowDown/>
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white border border-black shadow-lg ">
            <div className="px-1 py-1 font-Archivo text-base">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={()=>handleSortBy("lowToHigh")}
                    className={`${
                      active ? 'bg-black text-white' : 'text-black'
                    } group flex w-full items-center rounded-md px-2 py-2 `}
                  >
                    Low to High
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={()=>handleSortBy("highToLow")}
                    className={`${
                      active ? 'bg-black text-white' : 'text-black'
                    } group flex w-full items-center rounded-md px-2 py-2 `}
                  >
                    High to Low
                  </button>
                )}
              </MenuItem>
            </div>
            
          </MenuItems>
        </Transition>
            </Menu>
            
          </div>
        </div>

        <div className="w-full flex justify-between gap-4">
          {showFilters && (
            <div className="my-2 px-2 py-4 w-1/4 border-t   border-black overflow-y-auto">
              <div className="w-full">
                <h1 className="font-medium text-xl mb-2">Shop By Price</h1>
                <input type="range" min={0} max={100000} className="w-full accent-black" value={priceRange[0]} onChange={handlePriceRangeFilter}/>
                <h1 className="w-full text-base flex justify-between"><span>₹ {priceRange[0]}</span>  <span>₹ {priceRange[1]}</span></h1>
              </div>
              <hr className="my-3 border-black/[0.5]"/>
              <div className="w-full">
                <Disclosure as="div" className="mt-2">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between items-center rounded-lg  py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring ">
                        <span className="text-xl">Shop By Brands</span>
                        <SlArrowDown
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-black`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="pb-2 pt-1 text-lg ">
                        <ul>
                          {brands.map((brand, index) => (
                            <li key={index} className="flex items-center">
                              <input type="checkbox" id={brand} className="mr-2 w-4 h-4 rounded-xl accent-black text-xl" 
                                onChange={() => handleBrandFilter(brand)}
                                checked={selectedBrands.includes(brand)}
                              />
                              <label htmlFor={brand}>{brand}</label>
                            </li>
                          ))}
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          )}
          <div className={`${showFilters ? 'grid grid-cols-4' : 'grid grid-cols-5'} w-full gap-5` }>
            {sortedProducts.map((product) => {
              return (
              <Link key={product.id} to={`/products/${product.id}`}>
                <div
                  key={product.id}
                  className="w-auto h-fit border px-2 my-2 rounded-lg"
                >
                  <div className="w-40 h-40 mx-auto">
                    <img
                      src={product.image}
                      alt=""
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                  <div className="my-2 px-1">
                    <h1 className="text-base line-clamp-2">{product.title}</h1>
                    <h1 className="my-1 text-sm text-black/[0.7] capitalize">
                      {product.brand}
                    </h1>
                    <h1 className="text-2xl font-semibold">
                      ₹ {Number(product.price) * 80}{" "}
                    </h1>
                  </div>  
                </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCategory