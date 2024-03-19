
import React from 'react'

const DeveloperProfileCardLoader = () => {
  return (
    <div className='flex flex-col items-center justify-center animate-pulse gap-1'>
      <div className='md:flex md:items-center md:justify-center md:gap-4'>
        <div class="flex flex-col items-center justify-center  gap-3 bg-gray-300 rounded-full h-16 w-16 md:h-20 md:w-20"></div>
        <div className='md:gap-3 md:flex md:flex-col'>
          <div class="h-2.5 bg-gray-200 rounded-full w-36"></div>
          <div class="h-2.5 bg-gray-200 rounded-full w-24"></div>
        </div>
      </div>
      
      
      <div class="h-10 md:h-8 bg-gray-200 rounded-md w-16 md:w-32"></div>
        
    </div>
  )
}

export default DeveloperProfileCardLoader