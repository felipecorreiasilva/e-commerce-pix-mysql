"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {IoIosArrowDown} from 'react-icons/io'
import { links, linksMobile } from '../constants/NavbarLinks';
import { FaCartShopping } from "react-icons/fa6";
import { useRouter } from 'next/router';
import { useProductsContext } from '../context/CartContext';
import { useCartModalContext } from '../context/CartModalContext';
import CartModal from './CartModal';
import { IoMenu } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

    const {cartModal,setCartModal}=useCartModalContext();
    const [isClient, setIsClient] = useState(false)
    const { user } = useAuth();
  
    // const router = useRouter();
    const pathname = usePathname();

    const handleCartModal = () => {
        setCartModal(!cartModal)
      }
    
    const { products } = useProductsContext();

    let totalProductCount = products?.reduce((totalCount:any, product:any) => totalCount + product?.amountProduct, 0)
    
    useEffect(() => {
        setIsClient(true)
      }, [])

  return (

    <div className="">
    
    <div className='relative z-20'>
      <CartModal />
    </div>
    
    <nav className='fixed text-white z-10 w-screen bg-black bg-opacity-90 shadow lg:py-0 py-8'>
        <div className='flex items-center justify-between'>

        <div className='flex flex-shrink-0 items-center'>
            <a href='/' className='mx-12 text-2xl lg:text-4xl' >Coffee-shop</a>
            
            
        </div>

        <ul className="hidden md:flex text-xs lg:text-xs items-center justify-center">

            {links.map((link:any, i:number) => {

                    return (
                        
                        <div className='' key={i}>
                            {!link.submenu ? (
                                <li>
                                    <Link className='flex justify-center items-center h-[100px] w-[110px] hover:bg-[#0f0f0f] hover:bg-opacity-30' href={link.path}>{link.name}</Link>

                                </li>
                                
                            ):(
                                <li>
                                    <div 
                                    className='relative group'
                                    >
                                        <div className="inline-flex items-center">
                                            
                                            
                                            <div className='flex justify-center items-center h-[100px] w-[110px] hover:bg-[#0f0f0f] hover:bg-opacity-30'>
                                            <div className="mr-2 rotate-180 transition-all group-hover:rotate-0">
                                            <IoIosArrowDown />              
                                            </div>
                                            {link.name}
                                            <div className={`absolute hidden group-hover:flex flex-col bg-black bg-opacity-90 top-[100px] shadow-md transition-all`}>
                                                                
                                                {link.sublinks?.map((sublink:any,i:number) => {
                                                    return (
                                                        <div key={i} className="">

                                                        <Link
                                                        
                                                        className='flex flex-col px-[37px] py-[35px] hover:w-full hover:bg-[#0f0f0f] hover:bg-opacity-30' 
                                                        href={sublink.path}
                                                        >{sublink.name}</Link>

                                                        </div>
                                                        
                                                    )
                                                })}

                                            </div>
                                            </div>
                                            
                                            

                                        </div>
                                        

                                    
                                    </div>

                                </li>

                            )}     
                            
                        </div>
                                
                    )

                })
            }
            <Link
            href={`${user !== null ? `/profile/${user?.id}` : '/account/login'}`}
            className="flex h-[100px] w-[110px] items-center justify-center relative cursor-pointer hover:bg-[#0f0f0f] hover:bg-opacity-30"
            >
            <MdAccountCircle size={20} />
            </Link>
            
            <button onClick={handleCartModal} className="flex h-[100px] w-[110px] items-center justify-center relative cursor-pointer hover:bg-[#0f0f0f] hover:bg-opacity-30">
                <span className="absolute top-[26px] right-[28px] bg-red-500 rounded-full p-1 text-[11px] flex items-center justify-center h-4 w-4" >{isClient && totalProductCount}</span>
                <div className="text-white">
                    <FaCartShopping size={18}/>
                </div>
                
            </button>

        </ul>

        <button className='block md:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-[#0f0f0f] group'>
            <IoMenu  size={26}/>
            <div className='absolute top-0 -right-full h-screen w-7/12 bg-black text-white opacity-0
            group-focus:right-0 group-focus:opacity-100 group-hover:right-0 group-hover:opacity-100 transition-all duration-300' >
                <ul className='flex flex-col items-center w-full text-base cursor-pointer pt-10' >
                        
                        {linksMobile.map((link:any, i:number) => {
                            return (
                                <div key={i} className="p-4">
                                {!link.submenu ? (

                                    <li
                                    >

                                        <Link 
                                        
                                        href={`${link.name == 'Conta' ? user !== null ? `/profile/${user?.id}` : `/account/login` :link.path}`}
                                        // href={`${i == 5 ? `${user !== null ? `/profile/${user?.id}` : '/account/login'}`:link.path}`}

                                        className='hover:bg-[#0f0f0f] py-4'
                                        
                                        >
                                            <div className={`flex justify-center items-center hover:bg-[#0f0f0f] w-full`}>
                                            
                                            {link.name}

                                            </div>                                   
                                            
                                        </Link>

                                    </li>

                                ):(

                                    <li>

                                <div 
                                 
                                 
                                 className='hover:bg-[#0f0f0f] w-full group/productsMobile'
                                 >
                                     <div className={`flex justify-center items-center`}>
                                     
                                         <div className="mr-1 rotate-180 transition-all group-hover/productsMobile:rotate-0">
                                         <IoIosArrowDown />        
                                         </div>
                                     
                                     
                                         {link.name}
 
                                     </div>
                                     
                                     
                                     <div className='absolute top-0 -right-full h-screen w-full bg-black text-white opacity-0
                                     group-focus/productsMobile:right-0 group-focus/productsMobile:opacity-100 group-hover/productsMobile:right-0 group-hover/productsMobile:opacity-100  transition-all duration-300'>
 
                                         <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-10">
 
                                         {link.sublinks?.map((sublink:any,i:number) => {
                                             return (
                                                 
                                                 <Link
                                                 key={i}
                                                 className='py-4 w-full hover:bg-[#0f0f0f]' 
                                                 href={sublink.path}
                                                 >{sublink.name}</Link>
                                             )
                                         })}
 
                                         </ul>
 
                                     </div>
                                     
                                         
                                     
                                     
                                     
                                 </div>

                                    </li>

                                    

                                

                                    
                                    
                                )}                          

                                </div>
                                
                                
                                
                            )
                        })}
                        

                </ul>
            </div>
        </button>


                                    








        {/* <button className='block md:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-[#0f0f0f] group'>
            <IoMenu  size={26}/>
            <div className='absolute top-0 -right-full h-screen w-7/12 bg-black text-white opacity-0
            group-focus:right-0 group-focus:opacity-100 group-hover:right-0 group-hover:opacity-100 transition-all duration-300' >
                <ul className='flex flex-col items-center w-full text-base cursor-pointer pt-10' >
                        
                        {links.map((link:any, i:number) => {
                            return (
                                <li
                                key={i}
                                >

                                <Link 
                                 
                                href={`${link.path === "products" ? '' : link.path}`}
                                className='hover:bg-[#0f0f0f] py-4 w-full group/productsMobile'
                                >
                                    <div className={`${link.path === "products" && 'flex justify-center items-center'}`}>
                                    {link.submenu && (
                                        <div className="rotate-180 transition-all group-hover:rotate-0">
                                        <IoIosArrowDown />        
                                        </div>
                                    )}
                                    
                                    {link.name}

                                    </div>
                                    
                                    {link.submenu && (
                                    <div className='absolute top-0 -right-full h-screen w-full bg-black text-white opacity-0
                                    group-focus/productsMobile:right-0 group-focus/productsMobile:opacity-100 transition-all duration-300'>

                                        <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-10">

                                        {link.sublinks?.map((sublink:any,i:number) => {
                                            return (
                                                
                                                <Link
                                                key={i}
                                                className='py-4 w-full hover:bg-[#0f0f0f]' 
                                                href={sublink.path}
                                                >{sublink.name}</Link>
                                            )
                                        })}

                                        </ul>

                                    </div>
                                    
                                        
                                    )}
                                    
                                    
                                </Link>

                                </li>
                                
                                
                            )
                        })}

                </ul>
            </div>
        </button> */}
            
        </div>
     
    </nav>
    </div>

    
  )
}

export default Navbar