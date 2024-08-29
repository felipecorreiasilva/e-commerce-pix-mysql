"use client"

import React, { useEffect, useState } from 'react'
import MainContainer from '@/app/components/MainContainer';
import { usePaymentMethodContext } from '@/app/context/PaymentMethodContext';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { TbCopy } from "react-icons/tb";
import { TbCopyCheck } from "react-icons/tb";
import { useParams } from 'next/navigation';
import axios from 'axios';
interface newRequestDataType {
    
    id: number,
    txid: string,
    firstname: string,
    lastname: string,
    uf: string,
    city: string,
    neighborhood: string,
    adresses: string,
    imagemQrcode: string,
    pixCopiaECola: string,
}

export default function page() {
    const { newRequest, setNewRequest } = usePaymentMethodContext();
    const [newRequestData, setNewRequestData] = useState<newRequestDataType>(
        {
            id:0,txid:'',firstname:'',lastname:'',uf:'',city:'',neighborhood:'',
            adresses:'', imagemQrcode:'',pixCopiaECola:''
        });
    
    const [ clipboardState, setClipboardState ] = useState(false)
    const params = useParams()
    const locId = params?.id

    useEffect(() => {
        const handleGetNewRequestData = async () => {
            const _url = "http://localhost:3001/newRequest/v2/loc/"+locId+"/qrcode"
            const result = await axios.get(_url)
            const resultData = result.data[0]
                
                const data = {

                    id: resultData.id,
                    txid: resultData.txid,
                    firstname: resultData.firstname,
                    lastname: resultData.lastname,
                    uf: resultData.uf,
                    city: resultData.city,
                    neighborhood: resultData.neighborhood,
                    adresses: resultData.adresses,
                    imagemQrcode: resultData.imagemQrcode,
                    pixCopiaECola: resultData.pixCopiaECola,
                    
        
                }

                setNewRequestData({...data})
            
        }
        handleGetNewRequestData()
        
    }, []);

  return (
    <MainContainer>
        
            <div className='my-32 m-auto lg:w-[45%] w-[90%] bg-white border border-[#ccc] rounded-sm p-[20px] '>
            <div className='text-center font-medium mb-8'>
            <h2 className='text-2xl'>Pedido Realizado</h2>
            
                <p className='mt-4 break-words'>ID da Transação: {newRequestData.txid}</p>
                <p>Para: {newRequestData.firstname} {newRequestData.lastname}</p>
                <p>Estado: {newRequestData.uf}, Cidade: {newRequestData.city}</p>
                <p>Bairro: {newRequestData.neighborhood}, Rua: {newRequestData.adresses}</p>
                
            </div>
            <img className='h-[350px] m-auto' src={newRequest.imagemQrcode} />
            <div className='flex flex-col' >


              <label className='font-medium text-2xl mx-auto my-4'>Copia e Cola</label>
              
              <CopyToClipboard text={newRequest.pixCopiaECola}
                onCopy={() => setClipboardState(true)}>
                <button className='my-4 break-words font-medium'>{!clipboardState ? <TbCopy className='m-auto' size={40} color='#111827'/> : null}</button>
                
              </CopyToClipboard>
              
              {clipboardState ? <TbCopyCheck className='m-auto' size={40} color='#111827'/> : null}

            </div>
            
            
            
        </div>
    
    </MainContainer>
  )
}
