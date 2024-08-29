'use client'

import {Header} from "./Header";
import {Footer} from "./Footer";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md"
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
interface MainProps{
    children:any
}

export default function MainContainer (props:MainProps){
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
    setIsClient(true)
    })

    return (
        <>
        <ToastContainer className={''} />
        
        {isClient && (
            
            <main className="fixed overflow-x-hidden bg-zinc-200 w-screen h-screen">
                    
            <Header/>    
            {props.children}
            {/* <Footer/> */}
            </main>

        )}
        

        
            

        </>
    )
}