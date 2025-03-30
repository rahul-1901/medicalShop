import React from 'react'
import { User, LogOut } from 'lucide-react'
import webLogo from "./assets/webLogo.png";
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ setUserLogin }) => {

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      if (localStorage.getItem("userToken")) {
        localStorage.removeItem("userToken")
        localStorage.removeItem("userEmail")
        toast.success("Logout successfull...", { autoClose: 1000 })
        setTimeout(() => {
          setUserLogin(false);
          navigate("/login")
        }, 2000)
      } else {
        toast.warn("User not Logined...", { autoClose: 1000 })
      }
    } catch (error) {
      console.log("Error...")
    }
  }

  return (
    <>
      <div className='bg-white shadow-md top-0 left-0 w-full h-auto flex items-center justify-between z-1000 fixed'>
        <Link to="/"><div className='py-4 md:p-3 cursor-pointer text-xl md:text-2xl flex items-center text-green-800'><img src={webLogo} className='md:h-9 h-7' />Vedprakash Ayurveda</div></Link>
        <div className='mr-[15px] flex items-center gap-5 cursor-pointer'>
          <div className='relative group'>
            <Link to="/login">
              <User />
            </Link>
            <div className='absolute left-1/2 -translate-x-1/2 mt-2 bg-gray-700 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'>
              Login
            </div>
          </div>
          <div className='relative group'>
            <LogOut onClick={logOut} />
            <div className='absolute bg-gray-700 text-white left-1/2 -translate-x-1/2 mt-2 text-sm px-0.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'>
              LogOut
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Navbar