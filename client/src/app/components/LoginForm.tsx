'use client'

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

const LoginForm = () => {

	// Use the signIn method from the AuthContext
	const { logIn, errorsLogin } = useAuth();
	const [formData, setFormData] = useState<any>({
        email: '',
        password: ''
    });
	const [isShow, setIsShow] = useState(false);
	const handlePassword = () => setIsShow(!isShow);

	const handleLogin = async (e: any) => {
		e.preventDefault();
        
        await logIn(formData.email, formData.password);
		
		
	};

    const handleOnChange = (e:any)=> {

        e.preventDefault()

        switch(e.target.name){
          
            default:
              const newObj = {...formData,[e.target.name]:e.target.value}
              setFormData(newObj)
              break;
            
        }
     
    }

	return (
            
			<div className='mx-auto mt-32 lg:w-[512px] w-[90%] bg-white border border-[#ccc] shadow-xl rounded p-[20px]'>
			<h2 className='text-2xl font-bold'>Entrar</h2>

			<label className='flex justify-center item p-4 opacity-40'>Olá novamente</label>

					<form onSubmit={handleLogin} className="">			
						<div className="flex flex-col">

                        <label className='my-2 font-bold'>Endereço de email:</label>

                            <input
                                type="text"
                                name="email"
                                id="email"
                                className='border py-2 px-4 outline-none focus:border-cyan-600'
                                autoComplete="off"
                                required
                                
                                placeholder="Digite seu endereço de email"
                                onChange={handleOnChange}
                                value={formData.email}
                            />
                            {errorsLogin?.email && <span className='text-[#e63939] text-[12px] mt-2'>{errorsLogin?.email}</span>}

                        </div>
                    
                    
					<div className="relative">

                    <div className="flex flex-col">

                    <label className='my-2 font-bold'>Senha:</label>
        
                        <input
                        type={isShow ? "text" : "password"}
                        className='border py-2 px-4 outline-none focus:border-cyan-600'
                        required
                        placeholder="Digite sua senha"
                        id="password"
                        name="password"
                        onChange={handleOnChange}
                        value={formData.password}
                        />
                        {errorsLogin?.password && <span className='text-[#e63939] text-[12px] mt-2'>{errorsLogin?.password}</span>}      
                        
                    </div>

                    <div
                        onClick={handlePassword}
                        className="absolute top-[52px] right-3"
                        
                        >
                        {!isShow && <Eye size={18} />}
                        {isShow && <EyeOff size={18} />}
                    </div>

                    
                    
                    </div>	
					

						<button
							type="submit"
							className='bg-blue-500 my-6 py-2 flex ml-auto px-12 text-white'
						>
							Entrar
						</button>

						<div className='my-2'>

							<label>Ainda não possui uma conta?</label>
							<Link className='text-cyan-600 lg:ml-2' href="signup">
								
								Inscrever-se
							</Link>
							
						</div>

					</form>
				

			</div>
           
			
		
	);
};

export default LoginForm;