"use client"
import React from 'react'
import { useRouter } from "next/navigation"
import { IoChevronBackCircle } from "react-icons/io5";


const Header = ({back, logo, color}) => {

    const router = useRouter()
  return (
    <div className={`flex items-center justify-center py-10 relative w-full`} style={{backgroundColor: color || '#ffff'}}>
        {
            back && (
                <button className='absolute left-8 w-8' onClick={router.back}>
                    <IoChevronBackCircle className={`${color ? 'text-white' : 'text-[#2C3480]'} text-3xl`} />
                </button>
            )
        }
        <img src={logo} alt="Logo" className="h-12" />
    </div>
  )
}

export default Header