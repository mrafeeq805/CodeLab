import React from 'react'
import { useNavigate } from 'react-router-dom'

const DomainCard = () => {
  const navigate = useNavigate()
  const navigateDomains = () => {
    navigate('/projects')
  }
  return (
    <div onClick={navigateDomains} className='bg-light p-2 rounded-xl flex items-center justify-center flex-col'>
        <div className=''>
            <img className='h-8' src='/img/react.png' alt='icon' />
        </div>
        <span className='text-sm text-gray-500'>React JS</span>
    </div>
  )
}

export default DomainCard