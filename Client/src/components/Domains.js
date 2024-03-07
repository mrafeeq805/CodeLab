import React from 'react'
import DomainCard from './DomainCard'
import DomainCardLoader from './skelton/DomainCardLoader'
import { domains } from '../utils/constants'

export const Domains = () => {
    return (
        <div className='px-2 mt-4'>
            <div className='flex justify-between items-center'>
                <span className=' font-medium'>Projects by Domains</span>
                <span className='text-primary font-medium text-xs'>More</span>
            </div>
            {!domains && <DomainCardLoader/>}
            
            <div className='mt-3 grid grid-cols-5 gap-3'>
                {domains?.map((item,index) => <DomainCard key={index} name={item.name} img={item.img}/>)}
            </div>
        </div>
    )
}
