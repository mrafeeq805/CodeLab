import React from 'react'
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";

const ProfileMenuCard = ({icon,title}) => {
  const cookie = new Cookies()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () =>{
    cookie.remove('token', { path: '/' });
    cookie.remove('email', { path: '/' });
    cookie.remove('name', { path: '/' });
    cookie.remove('avatar', { path: '/' });
    navigate('/login')
    
  }
  const handlePages = () =>{
    if(title === "My Projects"){
      navigate('/myprojects')
    }
  }
  return (
    <div onClick={title === 'Logout' ? handleLogout : handlePages} className='flex items-center gap-8'>
        <div className=' rounded-full bg-light h-12 w-12 flex justify-center items-center'>
            <i className={" text-primary text-xl "+icon}></i>
        </div>
        <span className={title === "Logout" ? "text-red-500":"text-black"}>{title}</span>
    </div>
  )
}

export default ProfileMenuCard