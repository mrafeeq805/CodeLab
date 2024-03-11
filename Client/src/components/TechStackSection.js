import React from 'react'
import TechStackCard from './TechStackCard'

const TechStackSection = ({data}) => {

    
  return (
    <div className='my-4 px-2'>
        <span className='font-medium'>Tech Stacks Used ({data?.length || 0})</span>
        <div className='mt-2 flex gap-3'>
            {data?.map((item,index) => <TechStackCard icon={item.icon}/>)}
        </div>
    </div>
  )
}

export default TechStackSection