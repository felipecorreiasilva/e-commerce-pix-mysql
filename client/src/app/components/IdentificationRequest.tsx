'use client'

import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import { useIdentificationContext } from "../context/IdentificationContext";
import { InputMask } from '../utils/InputMask'
import { MdVerified } from "react-icons/md";

interface FormModel {
  identificationCpf: string
  identificationPhone: string
}

export default function IdentificationRequest() {
    
    const { identificationData, setIdentificationData, verifiedIdentification, setVerifiedIdentification } = useIdentificationContext();


    const handleChangeIdentification = () => {
      setVerifiedIdentification(false)
    }

    const handleOnChange = (e:any)=> {
      e.preventDefault()
      switch(e.target.name){

          case 'cpf':
              const cpfObj = {...identificationData,[e.target.name]:InputMask('cpf',e.target.value)}
              setIdentificationData(cpfObj)
              break;

          case 'phone':
              const phoneObj = {...identificationData,[e.target.name]:InputMask('phone',e.target.value)}
              setIdentificationData(phoneObj)
              break;
        
          default:
            const newObj = {...identificationData,[e.target.name]:e.target.value}
            setIdentificationData(newObj)
            break
         
      }
   
  }
  
  const handleOnSubmit = (e:any) => {   
    e.preventDefault()
    const unmaskCpf = identificationData?.cpf?.replace('.', '').replace('.', '').replace('-', '')
    const unmaskPhone = identificationData?.phone?.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
    
    setIdentificationData(identificationData)

    setVerifiedIdentification(true)
    
}
    
  return (
    <div>

      {!verifiedIdentification ?
      (<div className='mt-4 w-[80%] lg:w-1/2 mx-auto border p-5 border-gray-300 bg-white rounded shadow'>
            <h2 className='font-bold text-[#424242] text-xs mb-2'>

            &nbsp;IDENTIFICAÇÃO
            </h2>

            <div>
            
                    <form onSubmit={handleOnSubmit}>

                    <label className="flex text-xs font-medium text-gray-600">
                    Endereço de CPF&nbsp;<span className="text-red-600">*</span>
                    </label>

                    <input
                    
                    name="cpf"
                    id="cpf"
                    className='w-full border rounded border-stone-950 outline-none p-1 bg-white'
                    required
                    onChange={handleOnChange}
                    value={identificationData?.cpf}
                    />

                    <label className="flex text-xs font-medium text-gray-600">
                    Telefone&nbsp;<span className="text-red-600">*</span>
                    </label>

                    <input
                    
                    name="phone"
                    id="phone"
                    className='w-full border rounded border-stone-950 outline-none p-1 bg-white'
                    
                    required
                    onChange={handleOnChange}
                    value={identificationData?.phone}
                    />

                    <button type="submit" className='flex justify-center items-center bg-zinc-300 hover:bg-[#c3c3c7] p-1 mt-12 w-full'>
                    Escolher Formas de Pagamento
                    </button>
                    </form>

                
            
            

            </div>
      </div>) 
      :
      
            <div className='flex justify-between overflow-auto mt-4 w-[90%] lg:w-1/2 mx-auto border p-5 text-xs border-gray-300 bg-white rounded shadow'>
            <h2 className='font-bold flex text-[#424242] mb-2'>
            <MdVerified />
            &nbsp;IDENTIFICAÇÃO
            </h2>
                <div className='flex flex-col text-start ml-4'>

                  <p>Sua Identificação foi confirmada</p>
                  <p>CPF: {identificationData.cpf}</p>
                  <p>Telefone: {identificationData.phone}</p>

                </div>
              
                <button onClick={handleChangeIdentification} className=''>
                Alterar
                </button>       
            
            </div>
        
        }

    </div>
  )
}
