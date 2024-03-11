import React, { useEffect, useState } from 'react'
import DomainCard from './DomainCard'
import DomainCardLoader from './skelton/DomainCardLoader'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Domains = () => {
    const [domains,setDomains] = useState(null)
    useEffect(() => {
        axios.get('/getallcategories')
        .then(({data}) => {
            setDomains(data)
        })
    },[])
    return (
        <div className='px-2 mt-4'>
            <div className='flex justify-between items-center'>
                <span className=' font-medium'>Projects by Domains</span>
                <Link to={'/categories'}>
                    <span className='text-primary font-medium text-xs'>More</span>
                </Link>
                
            </div>
            {!domains && <DomainCardLoader/>}
            
            <div className='mt-3 grid grid-cols-5 gap-3'>
                {domains?.map((item,index) => <DomainCard key={index} name={item.title} img={item.icon}/>)}
            </div>
        </div>
    )
}
