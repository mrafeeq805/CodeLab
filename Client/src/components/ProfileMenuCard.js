import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';

const ProfileMenuCard = ({icon,title}) => {
  const dispatch = useDispatch()
  const handleLogout = () =>{
    signOut(auth).then(() => {
      dispatch(removeUser())
      console.log("logot successfully");
    }).catch((error) => {
      console.log(error);
    });
  }
  const handlePages = () =>{
    
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