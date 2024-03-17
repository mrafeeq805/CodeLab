import React from 'react'

const TechStackCard = ({icon}) => {
  return (
    <div>
        <img className='h-12 object-contain' src={icon} alt='icon'/>
    </div>
  )
}

export default TechStackCard