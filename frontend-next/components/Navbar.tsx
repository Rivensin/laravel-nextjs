'use client'
import { useEffect, useState, useRef, use } from 'react';
import Link from 'next/link';
import { myAppHook } from '../context/AppProvider';
import Cookies from 'js-cookie';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { logout, authToken, isLoading} = myAppHook();
  
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-8xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-lg font-semibold">
          Product Management App
        </Link>

        <button onClick={() => setOpen(!open)} className="lg:hidden focus:outline-none">
          <span className="block w-6 h-[2px] bg-white mb-1"></span>
          <span className="block w-6 h-[2px] bg-white mb-1"></span>
          <span className="block w-6 h-[2px] bg-white"></span>
        </button>

        <ul className={`flex-col lg:flex lg:flex-row lg:items-center lg:space-x-4 absolute lg:static left-0 w-full lg:w-auto bg-blue-600 lg:bg-transparent px-4 lg:px-0 transition-all duration-300 ${open ? "top-16" : "top-[-400px]"}`}>
          
          {authToken
            ? 
              <>
                <Link href="/dashboard">
                  <li className='hover:bg-white p-4 rounded-lg hover:text-blue-600 font-semibold duration-500 transition-all ease-out'>
                    <div className="py-2 lg:py-0 block">
                      Dashboard
                    </div>
                  </li>
                </Link>
                <Link href="/transaction">
                  <li className='hover:bg-white p-4 rounded-lg hover:text-blue-600 font-semibold duration-500 transition-all ease-out'>
                    <div className="py-2 lg:py-0 block">
                      Transaction
                    </div>
                  </li>
                </Link>
                <Link href="/sales">
                  <li className='hover:bg-white p-4 rounded-lg hover:text-blue-600 font-semibold duration-500 transition-all ease-out'>
                    <div className="py-2 lg:py-0 block">
                      Sales
                    </div>
                  </li>
                </Link>
                <li className='font-semibold'>
                  <button 
                    className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded mt-2 lg:mt-0"
                    onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            :
              <>
                <Link href="/">
                  <li className='hover:bg-white p-4 rounded-lg hover:text-blue-600 font-semibold duration-500 transition-all ease-out'>
                    <div className="py-2 lg:py-0 block">
                      Home
                    </div>
                  </li>
                </Link>
                
                <Link href="/auth">
                  <li className='hover:bg-white p-4 rounded-lg hover:text-blue-600 font-semibold duration-500 transition-all ease-out'>
                    <div className="py-2 lg:py-0 block">
                      Login
                    </div>
                  </li>
                </Link>
              </>
          }
          
        </ul>
      </div>
    </nav>
  )
}

export default Navbar