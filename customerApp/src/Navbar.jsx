import React from 'react'
import {User, LogOut} from 'lucide-react'

const Navbar = () => {
  return (
    <>
    <div className='bg-white shadow-md top-0 left-0 w-full h-auto flex items-center justify-between z-1000'>
        <div className='p-4 cursor-pointer text-2xl'>GuptaMedicals</div>
        <div className='mr-[10px] flex items-center gap-5 cursor-pointer'>
            <User/>
            <LogOut/>
        </div>
    </div>
    </>
  )
}

export default Navbar