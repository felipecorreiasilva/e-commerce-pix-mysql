'use client'

import MainContainer from "./components/MainContainer";
import Galerie from "./components/Galerie";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { ProductsTypes } from "./Types/ProductsTypes";
import axios from "axios";

export default function Home() {

  const [dataProducts, setDataProducts] = useState<ProductsTypes[]>([])    

    useEffect(() => {
        const fetchData = async () => {
            const _url = 'http://localhost:3001/products'
            const result = await axios.get(_url)
            setDataProducts(result.data)
        }
        fetchData();
      }, [])

  return (
    <>
    

    <MainContainer>

        <div className="w-full h-screen bg-cover bg-center" style={{backgroundImage: "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Vwd2s2MTcxMzA4Ni13aWtpbWVkaWEtaW1hZ2Utam9iNTcyLTEuanBn.jpg)"}}
          >
          <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center flex-col">
          <h1 className="text-white font-bold text-4xl md:text-6xl lg:text-8x1" >Coffee<span className="text-[#f9bd93]" >SHOP</span></h1>
          <p className="text-white font-bold m-2 text-center text-[12px] md:text-[14px] lg:text-[16px] " >Confira todos nossos produtos</p>
          <a href="#products" className="text-white text-4xl cursor-pointer hover:text-[#f9bd93] hover:scale-110 transition-all" ><MdKeyboardArrowDown/></a>
          
          </div>

          </div>

          <div>
          <Galerie dataProducts={dataProducts} />

          </div>

      
    </MainContainer>
    
    </>
    
  );
}
