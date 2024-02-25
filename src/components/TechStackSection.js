import React from 'react'
import TechStackCard from './TechStackCard'

const TechStackSection = () => {
    const list = ['/img/react.png']
  return (
    <div className='my-4 px-2'>
        <span className='font-medium'>Tech Stacks Used (2)</span>
        <div className='mt-2'>
            {list.map(item => <TechStackCard icon={item}/>)}
        </div>
    </div>
  )
}

export default TechStackSection