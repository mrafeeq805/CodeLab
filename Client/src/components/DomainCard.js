import React from 'react'
import { useNavigate } from 'react-router-dom'

const DomainCard = ({name,img}) => {
  const navigate = useNavigate()
  const navigateDomains = () => {
    navigate('/projects/'+name)
  }
  return (
    <div onClick={navigateDomains} className='flex flex-col justify-center items-center '>
        <div className='bg-[#F5F5F5] p-3 w-16 md:w-full rounded-xl md:py-6 flex items-center md:flex-row md:gap-4 justify-center flex-col  '>
            <img className='h-10 w-10 md:h-10 lg:h-12 object-contain' src={img} alt='icon' />
        </div>
        <span className='text-sm text-gray-500 md:text-base'>{name}</span>
    </div>
  )
}

export default DomainCard