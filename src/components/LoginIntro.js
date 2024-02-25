import React from 'react'

const LoginIntro = ({info,title}) => {
  return (
    <div>
        <div className='flex justify-center items-center flex-col h-44 gap-2'>
            <img className='h-6' src='/logo.png' alt='icon' />
            <span className=' font-medium'>CodeLab</span>
        </div>
        <div className='px-4 flex flex-col space-y-1'>
            <span className='font-bold text-3xl text-login'>{title}</span>
            <span className=' text-sm text-login_light'>{info}</span>
        </div>
    </div>
  )
}

export default LoginIntro