import React from 'react'
import { useNavigate } from 'react-router-dom'

const DomainCard = ({name,img}) => {
  const navigate = useNavigate()
  const navigateDomains = () => {
    navigate('/projects/'+name)
  }
  return (
    <div onClick={navigateDomains} className='bg-light p-2 rounded-xl md:py-8 flex items-center md:flex-row md:gap-4 justify-center flex-col'>
        <div className=''>
            <img className='h-8 md:h-10 lg:h-12' src={img} alt='icon' />
        </div>
        <span className='text-sm text-gray-500 md:text-base'>{name}</span>
    </div>
  )
}

export default DomainCard