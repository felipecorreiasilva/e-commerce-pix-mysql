"use client";

import MainContainer from "@/app/components/MainContainer";
import RedirectHomeRoute from "@/app/components/RedirectHomeRoute";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useParams,useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoShieldCheckmark } from "react-icons/io5";

const page = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [verifyData, setVerify] = useState<any | null>('');
  const [errors, setErrors] = useState<string|null>('');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const params = useParams();
  const userId = params?.id;
  const { user, logOut, setUser } = useAuth();
  const router = useRouter();

  const handleOnChange = (e: any, index: number) => {
    if (isNaN(e.target.value)) return false;

    setOtp([
      ...otp.map((data, _index) => (_index === index ? e.target.value : data)),
    ]);

    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handlePaste = (e: any) => {

    const value = e.clipboardData.getData("text");

    if (isNaN(value)) return false;

    const updatedValue = value.toString().split("").slice(0, 4);

    setOtp(updatedValue);

    const focusedInput = e.target.parentNode.querySelector("input:focus");
    if (focusedInput) {
      focusedInput.blur();
    }

    const lastInput = e.target.parentNode.querySelector(
      'input[type="password"]:last-child'
    );
    if (lastInput) {
      lastInput.focus();
    }
  };

  const handleResendOTP = async () => {
    const bUrl = "http://localhost:3001/account/resendOTPVerification"
    const result = await axios.post(bUrl, verifyData);
    console.log(result.data);
  };

  const handleOnSubmit = async () => {
    const bUrl = "http://localhost:3001/account/verifyOTP/" + userId;
    const postData = {
      userId,
      otp,
    };
    const result = await axios.post(bUrl, postData);
    const resultData = result.data
    
    if (resultData.msgError) {
      setErrors(resultData.msgError)
      
    }
    if (resultData.verified){
      alert(resultData.msgSuccess)
      router.push(`/account/${user.id}`);
    }
    
  };

  const handleLogOut = async () => {
    await logOut();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          // Stop
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  useEffect(() => {
    const getAccountData = async() => {

        const bUrl = `http://localhost:3001/account/${userId}`
        
        if (user?.id) {
            if (userId != user.id) {
            
                router.push(`/account/verifyOTP/${user.id}`);
                
            }else {

                const result = await axios.get(bUrl)
                const resultData = result.data
            
                setVerify({
                  userId,
                  email: resultData[0].email,
                  firstname: resultData[0].firstname,
                  lastname: resultData[0].lastname,
                })
                
                setUser({id: resultData[0]?.id, verified: resultData[0]?.verified })

            }
            
        }

    }
    getAccountData()
    
}, []);

  return (
    <MainContainer>
      <>
      {!user?.verified ? (
        <>
        {user?.id != null || undefined ? (
        <>
          {userId == user?.id && (
            <div className="mx-auto my-48 lg:w-[540px] w-[90%] bg-white p-20 shadow-xl rounded-lg ">
              <div className="flex flex-col justify-center items-center">
                <div className="bg-green-900 shadow-2xl p-[18px] rounded-full size-32px] mb-4">
                  <IoShieldCheckmark size={40} color="white"/>
                </div>
                <h2 className="font-bold text-lg mb-[16px]">
                  Cadastro realizado com sucesso !
                </h2>
                <p className="text-xs">
                  Verifique seu email para ter acesso completo da sua conta
                </p>
                <p className="text-xs text-center">
                  O código de verificação foi enviado para {verifyData?.email}.
                </p>
              </div>

              <div className="w-[70%] flex justify-center gap-[10px] mx-auto my-[20px]">
                {otp.map((data, i: number) => {
                  return (
                    <input
                      key={i}
                      type="password"
                      onPaste={(e) => {
                        handlePaste(e);
                      }}
                      onChange={(e) => handleOnChange(e, i)}
                      value={data}
                      maxLength={1}
                      className="border w-[40px] focus:border-cyan-600 border-gray-300 text-center p-[6px] outline-none"
                    />
                  );
                })}
                
              </div>
              {errors && <span className='text-[#e63939] text-[12px] mt-2 flex justify-center'>{errors}</span>}

              <div className="flex justify-between my-8 lg:my-16">
                <p>
                  <span
                    className={`${
                      seconds > 0 || minutes > 0 ? `text-red-500` : ""
                    }`}
                  >
                    Tempo restante: {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </span>
                </p>

                <button
                  disabled={seconds > 0 || minutes > 0}
                  className={`${
                    seconds > 0 || minutes > 0
                      ? `text-red-500`
                      : "text-blue-600"
                  }`}
                  onClick={handleResendOTP}
                >
                  Reenviar código
                </button>
              </div>

              <div className="flex justify-between">

              <button
                onClick={handleOnSubmit}
                className="p-[10px] lg:w-32 bg-stone-950 hover:bg-stone-800 text-white"
              >
                Verificar
              </button>

              <button onClick={handleLogOut} className="text-red-500 underline mr-[20px] lg:mr-[40px]">
                Sair
              </button>

              </div>
              
            </div>
          )}
        </>
      ) : (
        <RedirectHomeRoute>
          <></>
        </RedirectHomeRoute>
      )}
        </>

      ):(
        router.push(`/account/${user.id}`)
      )}
      </>
      
    </MainContainer>
  );
};

export default page;
