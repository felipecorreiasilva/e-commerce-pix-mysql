'use client'

import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { useContactContext } from "../context/MyContactContext";
import { Formik, Form } from 'formik';
import axios from "axios";
import { ProductsTypes } from "../Types/ProductsTypes";

interface FormModel {
    email: string
}

export default function MyContactRequest() {

  const { emailContact, setEmailContact, verifiedEmailContact, setVerifiedEmailContact } = useContactContext();

    const handleChangeEmail = () => {
        setVerifiedEmailContact(false)
    }

    const handleOnSubmit = (e:any) => {
        setEmailContact(emailContact)
        setVerifiedEmailContact(true)
    }

    

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
    
    <div>
      {!verifiedEmailContact ? 
        (<div className='mt-32 w-[80%] lg:w-1/2 mx-auto border p-5 border-gray-300 bg-white rounded shadow'>
            
            <div className="">

            <h2 className='font-bold text-[#424242] text-xs mb-2'>

            &nbsp;MEU CONTATO
            </h2>

            </div>
            
            <div className='flex font-bold text-[#424242] p-5 bg-zinc-300 text-xs justify-center items-center'>
            <p>Já tem uma conta ?&nbsp;</p>
            <a className="text-cyan-500" href="Login">
                Entrar
            </a>
            </div>

            <div className='flex space-x-8 py-8 justify-center'>

            <span className='border-b shadow-md border-zinc-300  w-full'></span>
            <p className="text-xs text-nowrap">Ou continue abaixo</p>
            <span className='border-b shadow-md border-zinc-300 w-full'></span>
            
            </div>

            <div>
            
                <form onSubmit={handleOnSubmit}>

                      <div className="">

                      <label className="flex mb-4 text-xs font-medium text-gray-600">
                      Endereço de email&nbsp;<span className="text-red-600">*</span>
                      </label>
        
                      <input
                      type="email"
                      name="email"
                      id="email"
                      className='w-full border rounded border-stone-950 outline-none p-1 bg-white'
                      autoComplete="off"
                      required
                      onChange={e => setEmailContact(e.target.value)}
                      value={emailContact}
                      />

                      </div>

                    <p className="mb-8 text-xs mt-2 text-gray-600">O número do pedido e o recibo serão enviados para este endereço de e-mail.</p>
                    
        
                    <button type="submit" className='flex justify-center items-center bg-zinc-300 hover:bg-[#c3c3c7] p-1 w-full'>
                    Prosseguir para Entrega
                    </button>
                    
                </form>

            </div>
            </div>) 
        : (
            <div className='flex justify-between overflow-auto mt-32 w-[90%] lg:w-1/2 mx-auto border p-5 text-xs border-gray-300 bg-white rounded shadow'>
                
                <h2 className='font-bold text-[#424242] text-xs mb-2 flex'>
                <MdVerified />
                &nbsp;MEU CONTATO
                </h2>

                

                <div className='flex flex-col text-start'>
                <p>{emailContact}</p>
                    <p>Sua conta será criada com as<br/>informações fornecidas.</p>
                    <p></p>
                </div>
                    
                    

                    <button onClick={handleChangeEmail} className=''>
                    Alterar
                    </button>       
                
                
            </div>
        )
      }
    </div>
  );
}
