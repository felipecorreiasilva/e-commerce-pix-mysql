"use client"

import MainContainer from '@/app/components/MainContainer';
import RedirectHomeRoute from '@/app/components/RedirectHomeRoute';
import { useAuth } from '@/app/context/AuthContext';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';

const Account = () => {
	
	const { user, logOut } = useAuth();
	const router = useRouter();
    const params = useParams()
    const accountId = params?.id
    const [accountData, setAccountData] = useState<any>({})

    useEffect(() => {
        const getAccountData = async() => {

            const bUrl = `http://localhost:3001/account/${accountId}`
            
            if (user?.id) {
                if (accountId != user.id) {
                
                    router.push(`/account/${user.id}`);
                    
                }else {

                    const result = await axios.get(bUrl)
                    const resultData = result.data
                
                    setAccountData(resultData[0])

                }
                
            }

        }
        getAccountData()
        
    }, []);
    
	return (
        
            <MainContainer>

                {user?.id != null || undefined ?
                
                (
                <div className="flex py-2 container mx-auto min-h-screen items-center">
                    {accountId == user?.id && (
                        <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
                        <h2 className="text-2xl font-semibold mb-4">
                            Você está logado {accountData?.email}
                        </h2>

                        <div className="flex justify-center items-center mb-8">
                            <button
                                onClick={() => {
                                    logOut();
                                    
                                }}
                                className="bg-black hover:bg-[#0f0f0f] px-10 py-3 rounded-md shadow-sm text-white"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    )}
                    
                </div>) 


                :(<RedirectHomeRoute><div></div></RedirectHomeRoute>)

                }
            </MainContainer>
        
		

	);
};

export default Account;