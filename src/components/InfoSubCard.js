import React from 'react'

const InfoSubCard = ({name,value}) => {
  return (
    <div className='flex p-3 odd:bg-gray-200'>
        <span className='w-full'>{name}</span>
        <span className='w-full'>{value}</span>
    </div>
  )
}

export default InfoSubCard