import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginIntro = ({info,title}) => {
  const navigate = useNavigate()
  return (
    <div className='relative'>
        <div className='flex justify-center items-center flex-col h-44 gap-2'>
            <img className='h-6' src='/logo.png' alt='icon' />
            <span className=' font-medium'>CodeLab</span>
        </div>
        <div className='px-4 flex flex-col space-y-1'>
            <span className='font-bold text-3xl text-login'>{title}</span>
            <span className=' text-sm text-login_light'>{info}</span>
        </div>
        <button onClick={() => navigate('/')} className='absolute top-2 right-2 flex justify-center items-center rounded-full h-10 w-10 p-2 bg-slate-50'>
            <i className="bi bi-x text-xl"></i>
        </button>
    </div>
  )
}

export default LoginIntro