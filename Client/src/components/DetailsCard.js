import React from 'react'

const DetailsCard = ({title,description}) => {
  return (
    <div className='bg-white p-3 my-3'>
        <span className='font-medium text-lg'>{title}</span>
        <hr className='my-2'></hr>
        {title === 'Features' ? description : <p>{description}</p>}
        
    </div>
  )
}

export default DetailsCard