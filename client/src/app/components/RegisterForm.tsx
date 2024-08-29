'use client'

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import MainContainer from './MainContainer';
import { InputMask } from '../utils/InputMask';

const RegisterForm = () => {

	// Use the signIn method from the AuthContext
	const { signUp, errorsRegister } = useAuth();
	
	const [formData, setFormData] = useState<any>({
        firstname: '',
        lastname: '',     
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        birth: ''
        
    });
	const [isShow, setIsShow] = useState(false);
	const handlePassword = () => setIsShow(!isShow);

    
	const handleRegister = async (e: any) => {
		e.preventDefault();
    
        await signUp(formData)
        
		
		
	};

    const handleOnChange = (e:any)=> {

        e.preventDefault()

        switch(e.target.name){

            case 'phone':
              const phoneObj = {...formData,[e.target.name]:InputMask('phone',e.target.value)}
              setFormData(phoneObj)
                break;
          
            default:
              const newObj = {...formData,[e.target.name]:e.target.value}
              setFormData(newObj)
              break
           
        }
     
    }

	return (
		

            <div className='mx-auto mt-32 lg:w-[512px] w-[90%] bg-white border border-[#ccc] shadow-xl rounded p-[20px]'>
			<h2 className='text-2xl font-bold'>Inscrever-se</h2>
            
			<label className='flex justify-center item p-4 opacity-40'>Bem vindo</label>

					<form onSubmit={handleRegister} className="">

						<div className="flex flex-col">

                        <label className='my-2 font-bold'>Nome:</label>

                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                className='border py-2 px-4 outline-none focus:border-cyan-600'
                                autoComplete="off"
                                placeholder="Digite seu nome"
                                onChange={handleOnChange}
                                value={formData.firstname}
                            />
                            {errorsRegister?.firstname && <span className='text-[#e63939] text-[12px] mt-2'>{errorsRegister?.firstname}</span>}

                        </div>

						<div className="flex flex-col">

                        <label className='my-2 font-bold'>Sobrenome:</label>

                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                className='border py-2 px-4 outline-none focus:border-cyan-600'
                                autoComplete="off"
                                placeholder="Digite seu sobrenome"
                                onChange={handleOnChange}
                                value={formData.lastname}
                            />
                            {errorsRegister?.lastname && <span className='text-[#e63939] text-[12px] mt-2'>{errorsRegister?.lastname}</span>}

                        </div>
                    
                        <div className="relative">

                        <div className="flex flex-col">

                        <label className='my-2 font-bold'>Senha:</label>
            
                            <input
                            type={isShow ? "text" : "password"}
                            className='border py-2 px-4 outline-none focus:border-cyan-600'
                            placeholder="Digite sua senha"
                            id="password"
                            name="password"
                            onChange={handleOnChange}
                            value={formData.password}
                            />
                            {errorsRegister?.password && <span className='text-[#e63939] text-[12px] mt-2'>{errorsRegister?.password}</span>}
                                  
                            
                        </div>

                        <div
                            onClick={handlePassword}
                            className="absolute top-[52px] right-3"
                            
                            >
                            {!isShow && <Eye size={18} />}
                            {isShow && <EyeOff size={18} />}
                        </div>

                        
                        
                        </div>

                        <div className="flex flex-col">

                        <label className='my-2 font-bold'>Repetir senha:</label>
            
                            <input
                            type={isShow ? "text" : "password"}
                            className='border py-2 px-4 outline-none focus:border-cyan-600'
                            placeholder="Digite sua senha"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={handleOnChange}
                            value={formData.confirmPassword}
                            />
                            {errorsRegister?.confirmPassword && <span className='text-[#e63939] text-[12px] mt-2'>{errorsRegister?.confirmPassword}</span>}
                            
                        </div>

                        <div className="flex flex-col">

                        <label className='my-2 font-bold'>Endereço de email:</label>

                            <input
                                type="text"
                                name="email"
                                id="email"
                                className='border py-2 px-4 outline-none focus:border-cyan-600'
                                autoComplete="off"
                                placeholder="Digite seu endereço de email"
                                onChange={handleOnChange}
                                value={formData.email}
                            />
                            {errorsRegister?.email && <span className='text-[#e63939] text-[12px] mt-2'>{errorsRegister?.email}</span>}

                        </div>

                        <div className="flex flex-col">

                        <label className='my-2 font-bold'>Telefone:</label>

                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                className='border py-2 px-4 outline-none focus:border-cyan-600'
                                autoComplete="off"
                                placeholder="Digite seu número de telefone"
                                onChange={handleOnChange}
                                value={formData.phone}
                            />
                            {errorsRegister?.phone && <span className='text-[#e63939] text-[12px] mt-2'>{errorsRegister?.phone}</span>}

                        </div>

                        <div className="flex flex-col">

                        <label className='my-2 font-bold'>Data de nascimento:</label>
            
                            <input
                            type='date'
                            className='border py-2 px-4 outline-none focus:border-cyan-600 text-gray-400'
                            id="birth"
                            name="birth"
                            onChange={handleOnChange}
                            value={formData.birth}
                            />
                            {errorsRegister?.birth && <span className='text-[#e63939] text-[12px] mt-2'>{errorsRegister?.birth}</span>}       
                            
                        </div>


						<button
							type="submit"
							className='bg-blue-500 my-6 py-2 flex ml-auto px-12 text-white'
						>
							Cadastrar
						</button>

						<div className='my-2'>

							<label>Já possui uma conta?</label>
							<Link className='text-cyan-600 ml-2' href="login">
								
								Entrar
							</Link>
							
						</div>

					</form>
				

			</div>

        
			
			
		
	);
};

export default RegisterForm;