
import { FaFacebookSquare } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'


const Header = () => {
  return (
    <div className="mt-0 w-full lg:px-20 py-3 flex justify-center  lg:justify-between items-center text-sm font-semibold bg-black text-white font-Archivo">
      <div className="hidden lg:block">
        <h1>
          <span className="text-stone-300">Mon-Sun:</span> 10:00 AM - 10:00 PM
        </h1>
      </div>
      <div>
        <h1 className="text-stone-300 text-[10px] md:text-sm flex">
          Visit our showroom in 1234 Street Adress City Address, 1234{" "}
          <span className="ml-2 text-white underline underline-offset-4 cursor-pointer hidden lg:block">
            Contact Us
          </span>
        </h1>
      </div>
      <div className="hidden lg:flex items-center ">
        <h1>Call Us: (00) 1234 5678</h1>
        <div className="ml-4 flex items-center gap-2">
          <FaFacebookSquare className=" text-xl" />
          <RiInstagramFill className=" text-xl" />
        </div>
      </div>
    </div>
  )
}

export default Header