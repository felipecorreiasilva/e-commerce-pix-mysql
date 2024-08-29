'use client'

import MainContainer from '@/app/components/MainContainer'
import ProtectedRoute from '@/app/components/ProtectedRoute'
import RegisterForm from '@/app/components/RegisterForm'
import { useAuth } from '@/app/context/AuthContext';
import React from 'react'

export default function page ()  {
  const { user } = useAuth();
  return (
    <MainContainer>
    {user === null ? 
        (<RegisterForm/>):(<ProtectedRoute><div className=""></div></ProtectedRoute>)
    }
    </MainContainer>
    )
 
}
