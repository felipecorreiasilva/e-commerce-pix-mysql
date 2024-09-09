"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserAuth } from "../Types/AuthTypes";
import axios from 'axios';
import { useRouter } from 'next/navigation'

const AuthContext = createContext({
    user: {},
    setUser: function (value:any) { return value },
    errorsRegister: {},
    setErrorsRegister: function (value:any) { return value },
    errorsLogin: {},
    setErrorsLogin: function (value:any) { return value },
    signUp: function (value:any) {},
    logIn: function (email: string, password: string) {},
    logOut: function () {}
});

export const useAuth = () => useContext<any>(AuthContext);

const getInitialAuth = () => {
    const user = (typeof window !== 'undefined') && localStorage.getItem('user')
    return user && JSON.parse(user)
}
// Create the auth context provider
export const AuthContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    
    const [user, setUser] = useState<any>(getInitialAuth);
    const [errorsLogin,setErrorsLogin] = useState<any>({
        email: '',
        password: ''
        
    })
    const [errorsRegister,setErrorsRegister] = useState<any>({
        
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        birth: ''
        
    })
    const router = useRouter();
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user]);
    
    // Sign up the user
    const signUp = async(values:any) => {
        
        const validationErrors = {

            firstname: '',
            lastname: '',
            password: '',
            confirmPassword: '',
            email: '',
            phone: '',
            birth: ''
            

        }
        
        const unmaskPhone = values.phone?.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
        
        if (!values.firstname.trim()){
            validationErrors.firstname = "Campo obrigatório"
            setErrorsRegister(validationErrors)
            return
        } else if (values.firstname.length < 3){
            validationErrors.firstname = 'Nome deve ter pelo menos 3 caracteres'
            setErrorsRegister(validationErrors)
            return
        }
        
        if (!values.lastname.trim()){
            validationErrors.lastname = "Campo obrigatório"
            setErrorsRegister(validationErrors)
            return
        } else if (values.lastname.length < 3){
            validationErrors.lastname = 'Sobrenome deve ter pelo menos 3 caracteres'
            setErrorsRegister(validationErrors)
            return
        }
        
        if (!values.password.trim()){
            validationErrors.password = "Campo obrigatório"
            setErrorsRegister(validationErrors)
            return
        } else if (values.password.length < 8){
            validationErrors.password = 'Senha deve ter pelo menos 8 caracteres'
            setErrorsRegister(validationErrors)
            return
        }
        
        if (!values.confirmPassword.trim()){
            validationErrors.confirmPassword = "Campo obrigatório"
            setErrorsRegister(validationErrors)
            return
            
        } else if (values.confirmPassword.length < 8){
            validationErrors.confirmPassword = 'Senha deve ter pelo menos 8 caracteres'
            setErrorsRegister(validationErrors)
            return
            
        } else if (values.confirmPassword !== values.password){
            validationErrors.confirmPassword = 'Senhas não estão semelhantes'
            setErrorsRegister(validationErrors)
            return
        }

        const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!values.email.trim()){
            validationErrors.email = "Campo obrigatório"
            setErrorsRegister(validationErrors)
            return
            
        } 
        else if (values.email.length < 3){
            validationErrors.email = "Email deve ter pelo menos 3 caracteres"
            setErrorsRegister(validationErrors)
            return
            
        } 
        
        else if (!emailValidator.test(values.email)){
            validationErrors.email = 'Formato de email inválido'
            setErrorsRegister(validationErrors)
            return
            
        }

        if (!unmaskPhone.trim()){
            validationErrors.phone = "Campo obrigatório"
            setErrorsRegister(validationErrors)
            return
        } else if (unmaskPhone?.length !== 11){
            validationErrors.phone = 'Formato de telefone inválido'
            setErrorsRegister(validationErrors)
            return
        }

        if (!values.birth.trim()){
            validationErrors.birth = "Campo obrigatório"
            setErrorsRegister(validationErrors)
            return
        }
        
        const bUrl = 'http://localhost:3001/account/signup'
        const postData = {
            ...values,
            phone: unmaskPhone
        }
        
        const result = await axios.post(bUrl,postData)
        const {registered, msgRegistered, userData} = result.data
        
        if (!registered){
            
            validationErrors.email = msgRegistered;
            setErrorsRegister(validationErrors)
            return

        }else {

            setUser({id: userData.insertId, verified: userData.verified })
            router.push(`/account/verifyOTP/${userData.insertId}`);
            
        }
        
            
    };

    // Login the user
    const logIn = async (email: string, password: string) => {

        const validationErrors = {

            email: '',
            password: '',
            

        }

        const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!email.trim()){
            validationErrors.email = "Campo obrigatório"
            setErrorsLogin(validationErrors)
            return
            
        } 
        else if (email.length < 3){
            validationErrors.email = "Email deve ter pelo menos 3 caracteres"
            setErrorsLogin(validationErrors)
            return
            
        } 
        
        else if (!emailValidator.test(email)){
            validationErrors.email = 'Formato de email inválido'
            setErrorsLogin(validationErrors)
            return
            
        }

        if (!password.trim()){
            validationErrors.password = "Campo obrigatório"
            setErrorsRegister(validationErrors)
            return
        } else if (password.length < 8){
            validationErrors.password = 'Senha deve ter pelo menos 8 caracteres'
            setErrorsRegister(validationErrors)
            return
        }


        const burl = 'http://localhost:3001/account/login'
        const postData = {
            email,
            password
        }
        const result = await axios.post(burl,postData)
        const {loggedIn, msgLoggedIn, userData } = result.data
        
        if(!loggedIn){
            validationErrors.email = msgLoggedIn;
            setErrorsLogin(validationErrors)
            return

        }else {

            setUser({id: userData.id, verified: userData.verified })
            if (!userData.verified) {
            router.push(`/account/verifyOTP/${userData.insertId}`);
            }else {
                router.push(`/account/${userData.insertId}`);
            }
            

        }
        
        

       
    };

    // Logout the user
    const logOut = async () => {
        setUser(null);
        router.push('/');
    };

    const value = { 
        user,
        setUser,
        signUp,
        logIn, 
        logOut,
        errorsRegister,
        setErrorsRegister,
        errorsLogin,
        setErrorsLogin
        
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};