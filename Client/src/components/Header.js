import React from 'react'
import { useNavigate } from  "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const navigateFavorites = () => {
    navigate('/favorites')
  }
  const navigateProfile = () => {
    navigate('/profile')
  }
  return (
    <header className='flex justify-between p-2 shadow-md py-3'>
      <div className='flex gap-2'>
        <img className='h-6' src='/logo.png' alt='logo' />
        <span className='text-primary font-medium text-lg'>CodeLab</span>
      </div>
      <div className='space-x-3'>
        <i onClick={navigateFavorites} class="bi bi-heart text-gray-500 text-2xl"></i>
        <i onClick={navigateProfile} class="bi bi-person-circle text-2xl text-gray-500"></i>
      </div>
      
    </header>
  )
}

export default Header