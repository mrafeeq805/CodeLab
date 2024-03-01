import React from 'react'
import LoginIntro from './LoginIntro'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const handlerSignup = () =>{
        navigate('/signup')
    }
  return (
    <div >
        <LoginIntro title={"User Signin"} info={"Please fill your detail to access your account."}/>
        <div className='mt-4 px-4'>
            <form className=''>
                <label className='text-login font-medium '>Email</label>
                <div className='border-2 rounded-lg flex justify-between p-2 my-3'>
                    <input className='w-full text-login_light' type='text'/>
                    <i class="bi bi-x-circle text-login_light text-lg"></i>
                </div>
                <label className='text-login font-medium'>Password</label>
                <div className='border-2 rounded-lg flex justify-between p-2 my-3'>
                    <input className='w-full text-login_light' type='password'/>
                    <i class="bi bi-eye-slash text-login_light text-lg"></i>
                </div>
                <button className='bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5'>
                     Signin
                </button>
                <div className='flex justify-center py-5'>
                    <span className='text-login_light text-'>Don’t have an account ? <span onClick={handlerSignup} className='text-primary font-medium'>Signup</span></span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login