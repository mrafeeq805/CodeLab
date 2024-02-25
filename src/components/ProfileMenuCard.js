import React from 'react'

const ProfileMenuCard = ({icon,title}) => {
  return (
    <div className='flex items-center gap-8'>
        <div className=' rounded-full bg-light h-12 w-12 flex justify-center items-center'>
            <i className={" text-primary text-xl "+icon}></i>
        </div>
        <span className={title === "Logout" ? "text-red-500":"text-black"}>{title}</span>
    </div>
  )
}

export default ProfileMenuCard