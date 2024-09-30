"use client"

import MainContainer from '@/app/components/MainContainer';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useAuth } from '@/app/context/AuthContext';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';

const Account = () => {
	
	const { user, logOut } = useAuth();
	const router = useRouter();
    const params = useParams()
    const accountId = params?.id

    useEffect(() => {
        if (!user?.id) {
            router.push('/');
        }
    }, [router, user]);
    
	return (
        
            <MainContainer>
                
                {user?.verified ? (
                    
                    <>
                        {user?.id != undefined &&
                
                        (
                        <div className="flex py-2 container mx-auto min-h-screen items-center">
                            {accountId == user?.id && (
                                <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
                                <h2 className="text-2xl font-semibold mb-4">
                                    Você está logado {user?.email}
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


                        

                        }
                    </>

                )
                :
                (<ProtectedRoute><></></ProtectedRoute>)}
                
                
            </MainContainer>
        
		

	);
};

export default Account;