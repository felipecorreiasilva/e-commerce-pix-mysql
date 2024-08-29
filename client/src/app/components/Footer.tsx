import React from 'react'

export const Footer = () => {
  return (
    <footer className='bg-black py-32 text-center'>
        <div className='flex justify-between'>
            <div></div>
            <div className='text-white' >
                <p>Localização: {process.env.NEXT_PUBLIC_MY_LOC}</p>
                <p className='my-2' >Telefone: {process.env.NEXT_PUBLIC_MY_WPP}</p>
                <p>Email: {process.env.NEXT_PUBLIC_MY_EMAIL}</p>
            </div>
        </div>
    </footer>
  )
}