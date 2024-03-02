import React from 'react'
import DomainCard from './DomainCard'

export const Domains = () => {
    const list = ['1','2','3','1','3','3']
    return (
        <div className='px-2 mt-4'>
            <div className='flex justify-between items-center'>
                <span className=' font-medium'>Projects by Domains</span>
                <span className='text-primary font-medium text-xs'>More</span>
            </div>
            
            <div className='mt-3 grid grid-cols-5 gap-3'>
                {list.map((item,index) => <DomainCard key={index} name={"Akshay"} img={"/img/dev.png"}/>)}
            </div>
        </div>
    )
}
