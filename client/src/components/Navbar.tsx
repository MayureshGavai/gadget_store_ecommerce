import Header from './Header'
import { Link } from 'react-router-dom'
import storeImg from "../assets/gadget_store.png";
import { IoIosSearch } from 'react-icons/io';
import { PiShoppingCart } from 'react-icons/pi';



const productCategories:string[] = [
    "tv",
    "audio",
    "laptop",
    "mobile",
    "gaming",
    "appliances"
  ]

const Navbar = () => {
  return (
    <div className="font-Archivo ">
      <Header />
      <div className="  bg-white  lg:px-20 lg:py-2 lg:border-b lg:flex lg:items-center lg:justify-between ">
        <div className="sticky top-[84px] z-10  w-full flex items-center justify-between">
          <Link to="/">
            <div className="w-16 h-10">
            <img
              src={storeImg}
              alt="store img"
              className="w-full h-full object-cover"
            />
          </div>
          </Link>
          <div className="group flex items-center">
            <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-black border-r-0 rounded-l-lg group-focus-within:border-black  md:group-focus-within:ml-5 md:group-focus-within:pl-0">
              <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                <IoIosSearch className="text-xl" />
              </div>
              <input
                type="text"
                className="bg-transparent outline-none pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                // onChange={(e)=> setSearchQuery(e.target.value)}
                // onKeyUp={searchQueryHandler}
                placeholder="Search"
                // value={searchQuery}
              />
            </div>
            <button
              className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-black rounded-r-lg hover:bg-black hover:text-white group-focus-within:bg-black group-focus-within:text-white"
              // onClick={()=> searchQueryHandler('searchButton')}
            >
              <IoIosSearch className=" text-xl" />
            </button>
          </div>
          <div className="hidden md:flex items-center justify-between gap-6">
            <Link to="/cart" className="relative flex items-center justify-center hover:rounded-full p-2 ">
              <PiShoppingCart className="text-3xl cursor-pointer text-black " />
              <span className="absolute top-[-3px] right-[-3px] bg-black rounded-full px-2 py-1 text-xs text-white">
                10
              </span>
            </Link>

            <div>
              <button className="px-4 py-2 text-base text-white bg-black rounded-lg">
                Signin
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:px-20 lg:py-2 flex justify-between items-center bg-white drop-shadow">
        {productCategories.map((category, idx) => {
          return (
            <Link
              key={idx}
              to={`/categories/${category}`}
              className="text-sm capitalize hover:font-semibold"
            >
              {category}
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default Navbar