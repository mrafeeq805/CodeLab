import React from 'react'
import { useNavigate } from 'react-router-dom'

const DomainCard = ({name,img}) => {
  const navigate = useNavigate()
  const navigateDomains = () => {
    navigate('/projects/'+name)
  }
  return (
    <div onClick={navigateDomains} className='bg-light p-2 rounded-xl flex items-center justify-center flex-col'>
        <div className=''>
            <img className='h-8' src={img} alt='icon' />
        </div>
        <span className='text-sm text-gray-500'>{name}</span>
    </div>
  )
}

export default DomainCard