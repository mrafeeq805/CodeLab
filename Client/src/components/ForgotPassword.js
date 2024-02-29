import React from 'react'
import LoginIntro from './LoginIntro'

const ForgotPassword = () => {
  return (
    <div >
        <LoginIntro title={"Forgot Password"} info={"Enter your regigstered Email ID  to continue"}/>
        <div className='mt-4 px-4'>
            <form className=''>
                <label className='text-login font-medium '>Email</label>
                <div className='border-2 rounded-lg flex justify-between p-2 my-3'>
                    <input className='w-full text-login_light' type='text'/>
                    <i class="bi bi-x-circle text-login_light text-lg"></i>
                </div>
                <label className='text-login font-medium hidden'>OTP</label>
                <div className='hidden border-2 rounded-lg flex justify-between p-2 my-3'>
                    <input className='w-full text-login_light' type='text'/>
                    <i class="bi bi-x-circle text-login_light text-lg"></i>
                </div>
                
                <button className='bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5'>
                     Continue
                </button>
                
            </form>
        </div>
    </div>
  )
}

export default ForgotPassword