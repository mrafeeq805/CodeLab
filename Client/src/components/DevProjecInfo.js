import React from 'react'

const DevProjecInfo = ({views,projects}) => {
  return (
    <div className='px-8 md:px-0'>
        <div className='rounded-lg bg-primary md:bg-white  p-2 flex '>
            <div className='flex gap-3 items-center w-full border-white md:border-gray-500 border-r-2 px-3'>
                <div className='p-1 bg-light rounded-lg md:p-3 md:px-3'>
                    <i class="bi bi-folder text-white text-2xl md:text-primary"></i>
                </div>
                <div className='flex flex-col'>
                    <span className='text-white md:text-gray-600 md:text-lg'>Projects</span>
                    <span className='text-white font-bold md:text-gray-600 md:text-lg'>{projects}</span>
                </div>
            </div>
            <div className='flex gap-3 items-center w-full px-3'>
                <div className='p-1 bg-light rounded-lg md:p-3 md:px-3'>
                    <i class="bi bi-eye text-white text-2xl md:text-primary"></i>
                </div>
                <div className='flex flex-col'>
                    <span className='text-white md:text-gray-600 md:text-lg'>Views</span>
                    <span className='text-white font-bold md:text-gray-600 md:text-lg'>{views}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DevProjecInfo