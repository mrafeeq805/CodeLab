import React from 'react'

const DevProjecInfo = ({views,projects}) => {
  return (
    <div className='px-8'>
        <div className='rounded-lg bg-primary  p-2 flex '>
            <div className='flex gap-3 items-center w-full border-white border-r-2 px-3'>
                <div className='p-1 bg-light rounded-lg'>
                    <i class="bi bi-folder text-white text-2xl"></i>
                </div>
                <div className='flex flex-col'>
                    <span className='text-white '>Projects</span>
                    <span className='text-white font-bold'>{projects}</span>
                </div>
            </div>
            <div className='flex gap-3 items-center w-full px-3'>
                <div className='p-1 bg-light rounded-lg'>
                    <i class="bi bi-eye text-white text-2xl"></i>
                </div>
                <div className='flex flex-col'>
                    <span className='text-white '>Views</span>
                    <span className='text-white font-bold'>{views}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DevProjecInfo