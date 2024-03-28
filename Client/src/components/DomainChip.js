import React from 'react'

const DomainChip = ({title}) => {
  return (
    <div className='bg-primary bg-opacity-50 rounded-sm px-3 h-max'>
        <span className='text-white text-sm w-16 truncate'>{title}</span>
    </div>
  )
}

export default DomainChip