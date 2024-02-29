import React from 'react'

const DomainChip = ({title}) => {
  return (
    <div className='bg-black bg-opacity-50 rounded-sm px-3'>
        <span className='text-white text-sm'>{title}</span>
    </div>
  )
}

export default DomainChip