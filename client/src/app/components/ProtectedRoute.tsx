'use client'

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    
    const router = useRouter();
    const { user } = useAuth();
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        
        if (user?.id) {
            if (!user?.verified) {
            router.push(`/account/verifyOTP/${user?.id}`);
            }else {
                router.push(`/account/${user?.id}`);
            }
            
            
        }
    }, [router, user]);

    return (isClient && (
        <>{user && children}</>
    ))
};

export default ProtectedRoute;