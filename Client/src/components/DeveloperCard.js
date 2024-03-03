import React from 'react'
import { useNavigate } from 'react-router-dom'

const DeveloperCard = ({name,avatar}) => {
  const navigate = useNavigate()
  const navigateDeveloperPage = () =>{
    navigate('/developerinfo')
  }
  return (
    <div onClick={navigateDeveloperPage} className='flex flex-col items-center justify-center'>
        <div className='border-[1px] border-primary rounded-full h-16 w-16 p-1'>
            <img src={avatar === '' ? '/img/dev.png' : avatar} alt='icon'/>
        </div>
        <span className='text-sm text-gray_main text-center'>{name}</span>
    </div>
  )
}

export default DeveloperCard