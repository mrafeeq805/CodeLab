import React from 'react'

const DeveloperCard = ({name,avatar}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='border-[1px] border-primary rounded-full h-16 w-16 p-1'>
            <img src={avatar === '' ? '/img/dev.png' : avatar} alt='icon'/>
        </div>
        <span className='text-sm text-gray_main text-center'>{name}</span>
    </div>
  )
}

export default DeveloperCard