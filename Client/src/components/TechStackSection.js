import React from 'react'
import TechStackCard from './TechStackCard'

const TechStackSection = ({data}) => {

    
  return (
    <div className='my-4 px-2 md:p-3 md:bg-white'>
        <span className='font-medium'>Tech Stacks Used ({data?.length || 0})</span>
        <div className='mt-2 grid grid-cols-4 gap-3 md:mt-4'>
            {data?.map((item,index) => <TechStackCard icon={item.icon}/>)}
        </div>
    </div>
  )
}

export default TechStackSection