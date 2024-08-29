"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface SendingToProviderProps {
    children: ReactNode;
}

const SendingToContext = createContext({
    sendingToData: {
        firstname: '',
        lastname: '',
        cep: '',
        adresses: '',
        houseNumber: '',
        cityComplement: '',
        neighborhood: '',
        country: 'Brasil',
        city: '',
        uf: '',
        height: '',
        width: '',
        _length: '',
        weight: '',
    },
    
    setSendingToData: function (value:any) { return value },
    verifiedSendingTo: false,
    setVerifiedSendingTo: function (value:any) { return value }

})

const getInitialSendingToData = () => {
    const sendingToData = (typeof window !== 'undefined') && localStorage.getItem('sendingToData')
    return sendingToData && JSON.parse(sendingToData)
}

const getInitialVerified = () => {
    const verifiedSendingTo = (typeof window !== 'undefined') && localStorage.getItem('verifiedSendingTo')
    return verifiedSendingTo ? JSON.parse(verifiedSendingTo) : null
}

export const SendingToProvider : React.FC<SendingToProviderProps> = ({children}) => {

    const [sendingToData, setSendingToData] = useState<any>(getInitialSendingToData);
    const [verifiedSendingTo, setVerifiedSendingTo] = useState<boolean>(getInitialVerified);
    
    useEffect(() => {
        localStorage.setItem('sendingToData', JSON.stringify(sendingToData))
    }, [sendingToData]);

    useEffect(() => {
        localStorage.setItem('verifiedSendingTo', JSON.stringify(verifiedSendingTo))
    }, [verifiedSendingTo]);

    const value = {
        sendingToData,
        setSendingToData,
        verifiedSendingTo,
        setVerifiedSendingTo
    }

    return (
        <SendingToContext.Provider value={value} >{children}</SendingToContext.Provider>
    ) 

}


export const useSendingToContext = () => {
    
    const context = useContext(SendingToContext)
    
    if (!context) {
        throw new Error('Error')
    }

    return context;
}