import React, { useEffect, useState } from 'react'
import DomainCard from './DomainCard'
import DomainCardLoader from './skelton/DomainCardLoader'
import { Link } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addCategory } from '../utils/projectSlice'


export const Domains = () => {
    const dispatch = useDispatch()
    const domains = useSelector((store) => store?.project?.category)
    useEffect(() => {
        async function call(){
			axios.get('getallcategories')
			.then(({data})=> {
				dispatch(addCategory(data))
			})
		}
		call()
    },[])
    return (
        <div className='px-2 mt-4 md:px-28'>
            <div className='flex justify-between items-center'>
                <span className=' font-medium md:text-lg'>Projects by Domains</span>
                <Link to={'/categories'}>
                    <span className='text-primary font-medium text-xs md:text-base'>More</span>
                </Link>
                
            </div>
            {!domains && <DomainCardLoader/>}
            
            <div className='mt-3 grid grid-cols-4 md:grid-cols-6 gap-3'>
                {domains?.map((item,index) => <DomainCard key={index} name={item.title} img={item.icon}/>)}
            </div>
        </div>
    )
}
