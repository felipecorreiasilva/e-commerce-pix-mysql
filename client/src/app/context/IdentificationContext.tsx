"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface IdentificationProviderProps {
    children: ReactNode;
}

const IdentificationContext = createContext({
    identificationData: {
        cpf: '',
        phone: '',
    },
    setIdentificationData: function (value:any) { return value },
    verifiedIdentification: false,
    setVerifiedIdentification: function (value:any) { return value }
})

const getInitialIdentificationData = () => {
    const identificationData = (typeof window !== 'undefined') && localStorage.getItem('identificationData')
    return identificationData && JSON.parse(identificationData)
}

const getInitialVerified = () => {
    const verifiedIdentification = (typeof window !== 'undefined') && localStorage.getItem('verifiedIdentification')
    return verifiedIdentification ? JSON.parse(verifiedIdentification) : null
}

export const IdentificationProvider : React.FC<IdentificationProviderProps> = ({children}) => {

    const [identificationData, setIdentificationData] = useState(getInitialIdentificationData);
    const [verifiedIdentification, setVerifiedIdentification] = useState<boolean>(getInitialVerified);

    const value = {
        identificationData,
        setIdentificationData,
        verifiedIdentification,
        setVerifiedIdentification
        
    }

    useEffect(() => {
        localStorage.setItem('identificationData', JSON.stringify(identificationData))
    }, [identificationData]);

    useEffect(() => {
        localStorage.setItem('verifiedIdentification', JSON.stringify(verifiedIdentification))
    }, [verifiedIdentification]);

    return (
        <IdentificationContext.Provider value={value} >{children}</IdentificationContext.Provider>
    ) 
}

export const useIdentificationContext = () => {
    
    const context = useContext(IdentificationContext);

    if (!context) {
        throw new Error('Error')
    }

    return context;
}