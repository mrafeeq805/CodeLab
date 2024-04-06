import React from 'react'
import { useNavigate } from 'react-router-dom'

const DeveloperCard = ({name,avatar,id}) => {
  const navigate = useNavigate()
  const navigateDeveloperPage = () =>{
    navigate('/developerinfo/'+id)
  }
  return (
    <div onClick={navigateDeveloperPage} className='flex flex-col items-center justify-center'>
        <div className='border-[1px] border-primary rounded-full h-16 w-16 p-1 md:h-24 md:w-24'>
            <img className='h-full w-full rounded-full' src={avatar || '/img/dev.png'} alt='icon'/>
        </div>
        <span className='text-sm text-gray_main text-center md:text-base capitalize max-w-20 truncate'>{name}</span>
    </div>
  )
}

export default DeveloperCard