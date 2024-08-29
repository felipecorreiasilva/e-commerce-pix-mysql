'use client'

import React, { useEffect, useState } from 'react'

import { useSendingToContext } from "../context/SendingToContext";
import { useRouter } from "next/navigation";
import { InputMask } from '../utils/InputMask'
import { MdVerified } from "react-icons/md";
import axios from 'axios';

export default function SendingToRequest() {
    
    const router = useRouter();
    
    const { 

        sendingToData,
        setSendingToData,
        verifiedSendingTo,
        setVerifiedSendingTo

    } = useSendingToContext();

    const [_listUf, setListUf] = useState<any[]>([])

    const handleOnChange = (e:any)=> {
        e.preventDefault()
        switch(e.target.name){

            case 'cep':
                const cepObj = {...sendingToData,[e.target.name]:InputMask('cep',e.target.value)}
                setSendingToData(cepObj)
                break;
          
            default:
             const newObj = {...sendingToData,[e.target.name]:e.target.value}
             setSendingToData(newObj)
                break;
           
        }
     
    }

    useEffect(() => {
        const handleGetUf = async() => {
            const burl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
      
            let listUf = (await axios.get(burl)).data
            setListUf(listUf)
          }
          handleGetUf()
        
    }, []);

    const handleOnBlurCep = (ev:any) => {

        const { value } = ev.target;

        const unmaskCep = value?.replace(/[^0-9]/g, '');

        if (unmaskCep?.length !== 8) {
            return;
        }

        fetch(`https://viacep.com.br/ws/${unmaskCep}/json/`)
            .then((res) => res.json())
            .then((data) => {

                setSendingToData({
                    ...sendingToData, 
                    adresses: data.logradouro, 
                    neighborhood: data.bairro,
                    city: data.localidade,
                    uf: data.uf
                })


            })

    }

    const handleOnChangeAdresses = () => {
        setVerifiedSendingTo(false)
        console.log('verifiedSendingTo')
    }

    const handleOnSubmit = (e:any) => {
        e.preventDefault()
        const unmaskCep = sendingToData.cep?.replace(/[^0-9]/g, '');
        setSendingToData({...sendingToData, cep: unmaskCep})
        setVerifiedSendingTo(true)
    }

  return (
    <div className=''>
       {!verifiedSendingTo ?
        (<div className='mt-4 w-[90%] lg:w-1/2 mx-auto border p-5 bg-white shadow border-gray-300 rounded'>
                    
                    <h2 className='font-bold text-[#424242] text-xs mb-2'>&nbsp;ENVIANDO PARA</h2>
                    
                        
                        <form onSubmit={handleOnSubmit}>

                            <div className="lg:grid grid-cols-1 lg:grid-cols-6 lg:gap-4">

                            <div className='lg:col-span-3 flex flex-col'>

                                <label className='flex text-xs my-2 font-medium text-gray-600'>Nome&nbsp;<span className='text-red-600'>*</span></label>

                                    <input
                                        type='text'
                                        name="firstname"
                                        id="firstname"
                                        className='border rounded border-stone-950 outline-none p-1 bg-white'
                                        required
                                        onChange={handleOnChange}
                                        value={sendingToData?.firstname}
                                    />

                            </div>

                            <div className='lg:col-span-3 flex flex-col'>

                                <label className='flex text-xs font-medium my-2 text-gray-600'>Sobrenome&nbsp;<span className='text-red-600'>*</span></label>

                                <input
                                    type='text'
                                    name="lastname"
                                    id="lastname"
                                    className='border rounded border-stone-950 outline-none p-1 bg-white'
                                    required
                                    onChange={handleOnChange}
                                    value={sendingToData?.lastname}
                                />

                            </div>

                            <div className="flex flex-col">

                                <label className='text-xs font-medium text-gray-600 my-2'>País&nbsp;<span className='text-red-600'>*</span></label>
                                <p className='font-semibold text-sm' >Brasil</p>

                            </div>

                    <div className='flex  flex-col lg:col-span-3 lg:col-start-1'>

                    <label className='text-xs font-medium text-gray-600 my-2'>CEP&nbsp;<span className='text-red-600'>*</span></label>

                    <input
                        type='text'
                        name="cep"
                        id="cep"
                        className='border rounded border-stone-950 outline-none p-1 bg-white'
                        required
                        onChange={handleOnChange}
                        onBlur={(ev) => handleOnBlurCep(ev)}
                        value={sendingToData?.cep}
                    />

                    </div>

                    <div className='flex flex-col lg:col-start-1 lg:col-span-4 mb-2'>

                    <label className='flex text-xs font-medium text-gray-600 my-2'>Endereço&nbsp;<span className='text-red-600'>*</span></label>

                    <input
                        type='text'
                        name="adresses"
                        id="adresses"
                        className='border rounded border-stone-950 outline-none p-1 bg-white'
                        required
                        onChange={handleOnChange}
                        value={sendingToData?.adresses}
                    />

                    </div>

                    <div className='flex flex-col col-span-2'>

                        <label className='flex text-xs font-medium text-gray-600 my-2'>Número&nbsp;<span className='text-red-600'>*</span></label>

                        <input
                            type='text'
                            name="houseNumber"
                            id="houseNumber"
                            className='border rounded border-stone-950 outline-none p-1 bg-white'
                            required
                            onChange={handleOnChange}
                            value={sendingToData?.houseNumber}
                        />

                    </div>

                    <div className="lg:col-start-1 lg:col-span-6 flex flex-col">

                    <label className='text-xs font-medium text-gray-600 my-2'>Complemento (opcional)</label>

                    <input
                        type='text'
                        name="cityComplement"
                        id="cityComplement"
                        className='border rounded border-stone-950 outline-none p-1 bg-white'
                        onChange={handleOnChange}
                        value={sendingToData?.cityComplement}
                    />

                    </div>

                    <div className="col-span-3 flex flex-col">

                    <label className='text-xs font-medium text-gray-600 my-2'>Bairro&nbsp;<span className='text-red-600'>*</span></label>

                        <input
                            type='text'
                            name="neighborhood"
                            id="neighborhood"
                            className='border rounded border-stone-950 outline-none p-1 bg-white'
                            required
                            onChange={handleOnChange}     
                            value={sendingToData?.neighborhood}
                        />

                    </div>

                        <div className='col-start-1 col-span-3 flex flex-col'>

                            <label className='text-xs font-medium text-gray-600 my-2'>Cidade&nbsp;<span className='text-red-600'>*</span></label>

                                <input
                                    type='text'
                                    name="city"
                                    id="city"
                                    className='border rounded border-stone-950 outline-none p-1 bg-white'
                                    required
                                    onChange={handleOnChange}
                                    value={sendingToData?.city}
                                />

                        </div>

                        <div className='col-span-3 flex flex-col'>

                            <label className='text-xs font-medium text-gray-600 my-2'>Estado&nbsp;<span className='text-red-600'>*</span></label>
                            
                            <select
                                
                                name="uf"
                                id="uf"
                                className='border rounded border-stone-950 outline-none p-[7px] bg-white'
                                required
                                onChange={handleOnChange}
                                value={sendingToData?.uf}
                            >
                                <option value=''>Selecione um estado</option>
                                {
                                    
                                _listUf?.map((uf:any) => (<option key={uf.id} value={uf.sigla}>{uf.nome}</option>))
                                }
                                
                            </select>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className='flex justify-center items-center bg-zinc-300 hover:bg-[#c3c3c7] p-1 mt-12 w-full'
                        >
                        Escolher Método de Entrega
                        </button>

                    </form>
 

        </div>) : (
            <div className='mt-4 w-[90%] lg:w-1/2 mx-auto border p-5 bg-white shadow border-gray-300 rounded flex justify-between text-xs'>
            
            <h2 className='font-bold flex text-[#424242] mb-2'>
            <MdVerified />
            &nbsp;ENVIANDO PARA
            </h2>

                <div className='flex flex-col text-start'>

                <p>
                {sendingToData?.firstname} {sendingToData.lastname}
                <br/>{sendingToData.adresses}, {sendingToData.houseNumber}
                <br/>{sendingToData.neighborhood}, 
                &nbsp;{sendingToData.city}
                &nbsp;/ ({sendingToData.uf})
                </p> 

                </div>

                <button type='submit' onClick={handleOnChangeAdresses} className=''>
                Alterar
                </button>       
            
            </div>
        
        )
        }

    </div>
  )
}
