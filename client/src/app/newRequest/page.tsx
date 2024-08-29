"use client"

import React, { useEffect, useState } from 'react'
import MainContainer from '../components/MainContainer'
import MyContactRequest from '../components/MyContactRequest';
import SendingToRequest from '../components/SendingToRequest';
import IdentificationRequest from '../components/IdentificationRequest';
import PaymentMethodRequest from '../components/PaymentMethodRequest';
import { useContactContext } from "../context/MyContactContext";
import { useSendingToContext } from '../context/SendingToContext';
import { useDeliveryMethodContext } from '../context/DeliveryMethodContext';
import { useIdentificationContext } from '../context/IdentificationContext';
import DeliveryMethodRequest from '../components/DeliveryMethodRequest';

export default function page() {
    const { verifiedEmailContact } = useContactContext();
    const { verifiedSendingTo } = useSendingToContext()
    const { verifiedDeliveryMethod } = useDeliveryMethodContext();
    const { verifiedIdentification } = useIdentificationContext();
 
    
  return (
    <MainContainer>
        
            
            {<MyContactRequest /> }
            
            {verifiedEmailContact && <SendingToRequest/>}
            {verifiedEmailContact && verifiedSendingTo && <DeliveryMethodRequest/>}
            {verifiedEmailContact && verifiedSendingTo && verifiedDeliveryMethod && <IdentificationRequest/>}  
            {verifiedEmailContact && verifiedSendingTo && verifiedDeliveryMethod && verifiedIdentification && <PaymentMethodRequest/>}

                
            
        
    </MainContainer>
    
  )
}
