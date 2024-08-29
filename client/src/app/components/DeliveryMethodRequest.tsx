'use client'

import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { useDeliveryMethodContext } from "../context/DeliveryMethodContext";
import { MdVerified } from "react-icons/md";
import { useProductsContext } from '../context/CartContext';
import axios from 'axios';
import { useSendingToContext } from '../context/SendingToContext';

export default function DeliveryMethodRequest() {
    const { products } = useProductsContext();
    const { deliveryMethod, setDeliveryMethod, verifiedDeliveryMethod, setVerifiedDeliveryMethod } = useDeliveryMethodContext();
    const { sendingToData, setSendingToData } = useSendingToContext();

    const handleChangeDeliveryMethod = () => {
        setVerifiedDeliveryMethod(false)
    }

    const handleOnChange = (e:any) => {
        e.preventDefault()

        switch(e.target.name){
          
            default:
              const newValue = {deliveryMethod,[e.target.name]:e.target.value}
              setDeliveryMethod(newValue)
              break;
           
        }
    }

    const handleOnSubmit = (e:any) => {
        e.preventDefault()
        setDeliveryMethod(deliveryMethod)
        setVerifiedDeliveryMethod(true)
    }

    const [fretes, setFretes] = useState<any>([])
    
    useEffect(() => {

            const calcFrete = async()=>{
                const unmaskCep = sendingToData.cep?.replace(/[^0-9]/g, '');
                const args = {
            
                    ...sendingToData,
                    ...products,
                    cep: unmaskCep,
                }
                const _url = 'http://localhost:3001/frete'
                const result = (await axios.post(_url,args)).data
                setFretes(result)
                
            }
            calcFrete()
    }, [])


  return (
    <div>
        {!verifiedDeliveryMethod ?
        (<div className='mt-4 overflow-auto w-[90%] lg:w-1/2 mx-auto border p-5 text-xs border-gray-300 bg-white rounded shadow'>
            <h2 className='mb-4'>

            &nbsp;MÉTODO DE FRETE
            </h2>

                    <form onSubmit={handleOnSubmit}>
                        <div className='space-y-8' >
                                
                            <div className='relative'>

                            <input
                            type="radio"
                            name="deliveryMethod"
                            id="deliveryMethodA"
                            className='hidden peer'
                            required
                            onChange={handleOnChange}
                            value='deliveryMethodMain'
                            />

                            <label
                            htmlFor='deliveryMethodA'
                            className="flex text-start p-4 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-green-400 peer-checked:text-white cursor-pointer transition">
                                <img 
                                    className='h-8 m-auto lg:m-0'
                                    src={`${fretes[0]?.company.picture}`} alt="" />
                                <div className='ml-8'>
                                    
                                    <h6 className=''>{`${fretes[0]?.name}`}</h6>
                                    <p className='text-xs opacity-60'>Entrega em até {`${fretes[0]?.delivery_time}`} dias</p>
                                    <p className='text-xs opacity-60'>Por apenas {`${fretes[0]?.price}`} R$</p>
                                </div>
                                
                            </label>

                            <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-green-950 scale-0 peer-checked:scale-100 transition delay-100 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 text-white my-auto mx-auto" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                            </div>

                            </div>
                            
                            <div className='relative'>

                            <input
                            type="radio"
                            name="deliveryMethod"
                            id="deliveryMethodB"
                            className='hidden peer'
                            required
                            onChange={handleOnChange}
                            value='deliveryMethodFree'
                            />

                            <label
                            htmlFor='deliveryMethodB'
                            className="flex text-start p-4 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-green-400 peer-checked:text-white cursor-pointer transition">
                                <img 
                                className='h-8 m-auto lg:m-0'
                                src={`${fretes[1]?.company.picture}`} alt="" />
                                <div className='ml-8'>
                                    <h6 className=''>{`${fretes[1]?.name}`}</h6>
                                    <p className='text-xs opacity-60'>Entrega em até {`${fretes[1]?.delivery_time}`} dias</p>
                                    <p className='text-xs opacity-60'>Por apenas {`${fretes[1]?.price}`} R$</p>
                                </div>
                                
                            </label>

                            <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-green-950 scale-0 peer-checked:scale-100 transition delay-100 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 text-white my-auto mx-auto" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                            </div>

                            </div>

                        </div>
                        
                    
        
                    <button type="submit" className='flex justify-center items-center bg-zinc-300 hover:bg-[#c3c3c7] p-1 mt-12 w-full'>
                    Escolher Identificação
                    </button>
                </form>
            
        </div>)
        :
        
                <div className='mt-4 w-[90%] lg:w-1/2 mx-auto border p-5 bg-white shadow border-gray-300 rounded flex justify-between text-xs'>
                <h2 className='font-bold flex text-[#424242] mb-2'>
                <MdVerified />
                &nbsp;MÉTODO DE FRETE
                </h2>
                    
                <div className='flex flex-col text-start mr-12'>
                <p>Você escolheu <br></br> o método de entrega {deliveryMethod === 'deliveryMethodMain'? 'PAC':'SEDEX'}</p>
                </div>
                    

                    <button onClick={handleChangeDeliveryMethod} className=''>
                    Alterar
                    </button>       
                
                </div>
        
        }
    </div>
  )
}
