'use client'

import React, { useState } from 'react'
import { Formik } from 'formik';
import { usePaymentMethodContext } from '../context/PaymentMethodContext';
import { useContactContext } from "../context/MyContactContext";
import { useDeliveryMethodContext } from "../context/DeliveryMethodContext";
import { useIdentificationContext } from "../context/IdentificationContext";
import { useSendingToContext } from "../context/SendingToContext";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { MdVerified } from 'react-icons/md';
import { useProductsContext } from '../context/CartContext';
import { FaPix } from "react-icons/fa6";
interface FormModel {
    paymentMethod: string

}

export default function PaymentMethodRequest() {

    const router = useRouter();
    const { emailContact, setEmailContact, verifiedEmailContact, setVerifiedEmailContact } = useContactContext();
    const { deliveryMethod, setDeliveryMethod, verifiedDeliveryMethod, setVerifiedDeliveryMethod } = useDeliveryMethodContext();
    const {sendingToData, verifiedSendingTo, setVerifiedSendingTo} = useSendingToContext();

    const { 

        firstname,
        lastname,
        country,
        cep,
        adresses,
        houseNumber,
        cityComplement,
        neighborhood,
        city,
        uf

    } = sendingToData;

    const { identificationData, setIdentificationData } = useIdentificationContext();
    const {cpf,phone} = identificationData
    const { paymentMethod, setPaymentMethod, verifiedPaymentMethod, setVerifiedPaymentMethod, setNewRequest } = usePaymentMethodContext();
    const {products,clearCart} = useProductsContext();
    const totalPrice = products.reduce((total, product) => total + (product.price * product.amountProduct), 0);
    
    const [buttonLoading, setButtonLoading] = useState(false)

    const handleChangePaymentMethod = () => {
        setVerifiedPaymentMethod(false)
    }

    const handleOnChange = (e:any)=> {
        e.preventDefault()

        switch(e.target.name){
          
            default:
              const newValue = e.target.value
              setPaymentMethod(newValue)
              break;
           
        }
     
    }

    const handleOnSubmit = async(e:any) => {
        e.preventDefault()
        
        setVerifiedPaymentMethod(false)

        setButtonLoading(true);

                const unmaskCpf = cpf?.replace('.', '').replace('.', '').replace('-', '')
                const unmaskPhone = phone?.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')

                const paymentData = {
                    
                    emailContact,
                    firstname,
                    lastname,
                    country,
                    cep,
                    adresses,
                    houseNumber,
                    cityComplement,
                    neighborhood,
                    city,
                    uf,
                    deliveryMethod,
                    cpf: unmaskCpf,
                    phone: unmaskPhone,
                    products,
                    totalPrice,
                    paymentMethod
                    
                }
                setPaymentMethod(paymentMethod)
                
                switch (paymentMethod) {
                    case 'paymentMethodPix':
                        const result = await axios.post('http://localhost:3001/newRequest', paymentData)

                        const locId = result?.data?.cobranca?.loc?.id
                        const newRequestData = {
                            id: locId,
                            txid: result.data.cobranca.txid,
                            pixCopiaECola: result.data.cobranca.pixCopiaECola,
                            imagemQrcode: result.data.qrcode.imagemQrcode,
                            ...paymentData,
                            cep: parseInt(cep),
                            country: 'Brasil',
                            
                        }
                        
                        await axios.post('http://localhost:3001/createNewRequest', newRequestData)
                        
                        setNewRequest(newRequestData)
                        
                        clearCart()
                        router.push(`/newRequest/v2/loc/${locId}/qrcode`);
                        break;

                    case 'paymentMethodCreditCard':
                        console.log('diamantes')
                        alert('Ainda não liberamos esse metódo de pagamento, utilize o metódo de pagamento pix.')
                        setButtonLoading(false);
                    break;
                    default:
                        console.log('asdasdsa');
                }
    }
  
    return (
  

        <div className='mb-32 mt-4 w-[90%] lg:w-1/2 mx-auto border p-5 bg-white shadow border-gray-300 rounded'>
            <h2 className='font-bold text-[#424242] text-xs mb-8'>

            &nbsp;MÉTODO DE PAGAMENTO
            </h2>

            <div>

                    <form onSubmit={handleOnSubmit}>
                        <div className='space-y-8' >
                                
                            <div className='relative'>

                            <input
                            type="radio"
                            name="paymentMethod"
                            id="paymentMethodPix"
                            className='hidden peer'
                            required
                            onChange={handleOnChange}
                            value='paymentMethodPix'
                            />

                            <label
                            htmlFor='paymentMethodPix'
                            className="flex text-start p-4 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-green-400 peer-checked:text-white cursor-pointer transition">
                            <FaPix className='size-32 lg:size-6 mr-16 ml-16 my-auto' />
                                <div className=''>
                                    <h6 className=''>Pix</h6>
                                    <span className='text-xs opacity-60'>Pagando por Pix, seu pagamento será confirmado em poucos segundos.<br/>aproveite nossos recursos.</span>
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
                            name="paymentMethod"
                            id="paymentMethodCreditCard"
                            className='hidden peer'
                            required
                            onChange={handleOnChange}
                            value='paymentMethodCreditCard'
                            />

                            <label
                            htmlFor='paymentMethodCreditCard'
                            className="flex text-start p-4 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-green-400 peer-checked:text-white cursor-pointer transition">
                            <FaPix className='size-32 lg:size-6 mr-16 ml-16 my-auto' />
                                <div className=''>
                                    <h6 className=''>Cartão de Crédito</h6>
                                    <span className='text-xs opacity-60'>Também aceitamos pagamentos com cartão de crédito, <br/>aproveite nossos recursos.</span>
                                </div>
                                
                            </label>

                            <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-green-950 scale-0 peer-checked:scale-100 transition delay-100 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 text-white my-auto mx-auto" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                            </div>

                            </div>
                    

                        </div>
                        
                    
        
                    <button type="submit" className='text-white w-full font-bold mt-[40px] p-4 bg-[#7f54b3] hover:bg-[#6a4597]'>
                    {!buttonLoading?'Finalizar Pedido' : <div className=''></div>}
                    </button>
                    
                </form>

            </div>
        </div>


    
  )
}
