import React from 'react'

const DomainCard = () => {
  return (
    <div className='bg-light p-2 rounded-xl flex items-center justify-center flex-col'>
        <div className=''>
            <img className='h-8' src='/img/react.png' alt='icon' />
        </div>
        <span className='text-sm text-gray-500'>React JS</span>
    </div>
  )
}

export default DomainCard