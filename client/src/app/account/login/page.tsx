"use client"

import LoginForm from '@/app/components/LoginForm';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useAuth } from '@/app/context/AuthContext';
import MainContainer from "@/app/components/MainContainer";

export default function Login() {
    
    const { user } = useAuth();
    
    return (
        
            <MainContainer>

                {user === null || undefined ? 
                (<LoginForm/>)
                :(<ProtectedRoute><div className=""></div></ProtectedRoute>)
                }

            </MainContainer>
 
    );
}