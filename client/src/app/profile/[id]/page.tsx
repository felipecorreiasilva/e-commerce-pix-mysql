"use client"

import MainContainer from '@/app/components/MainContainer';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import RedirectHomeRoute from '@/app/components/RedirectHomeRoute';
import { useAuth } from '@/app/context/AuthContext';
import axios from 'axios';
import Head from 'next/head';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';

const Profile = () => {
	
	const { user, logOut } = useAuth();
	const router = useRouter();
    const params = useParams()
    const profileId = params?.id
    const [profileData, setProfileData] = useState<any>({})

    useEffect(() => {
        const getProfileData = async() => {

            const bUrl = `http://localhost:3001/profile/${profileId}`
            
            if (user?.id) {
                if (profileId != user.id) {
                
                    router.push(`/profile/${user.id}`);
                    
                }else {

                    const result = await axios.get(bUrl)
                    const resultData = result.data
                
                    setProfileData(resultData[0])

                }
                
            }

        }
        getProfileData()
        
    }, []);
    
	return (
        
            <MainContainer>

                {user?.id ?
                
                (
                <div className="flex py-2 container mx-auto min-h-screen items-center">
                    {profileId == user?.id && (
                        <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
                        <h2 className="text-2xl font-semibold mb-4">
                            Você está logado {profileData?.email}
                        </h2>

                        <div className="flex justify-center items-center mb-8">
                            <button
                                onClick={() => {
                                    logOut();
                                    router.push('/');
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

export default Profile;