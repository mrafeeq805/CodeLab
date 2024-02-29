import React from 'react'
import LoginIntro from './LoginIntro'

const SetPassword = () => {
  return (
    <div >
        <LoginIntro title={"Set Password"} info={"Enter New Password for your account"}/>
        <div className='mt-4 px-4'>
            <form className=''>
                <label className='text-login font-medium '>New Password</label>
                <div className='border-2 rounded-lg flex justify-between p-2 my-3'>
                    <input className='w-full text-login_light' type='password'/>
                    <i class="bi bi-x-circle text-login_light text-lg"></i>
                </div>
                <label className='text-login font-medium'>Confirm Password</label>
                <div className='border-2 rounded-lg flex justify-between p-2 my-3'>
                    <input className='w-full text-login_light' type='password'/>
                    <i class="bi bi-eye-slash text-login_light text-lg"></i>
                </div>
                <button className='bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5'>
                     Save Password
                </button>
        
            </form>
        </div>
    </div>
  )
}

export default SetPassword