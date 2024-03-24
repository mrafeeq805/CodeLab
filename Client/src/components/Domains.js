import React, { useEffect, useState } from 'react'
import DomainCard from './DomainCard'
import DomainCardLoader from './skelton/DomainCardLoader'
import { Link } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addCategory } from '../utils/projectSlice'
import _ from 'lodash'
import { Bounce, ToastContainer, toast } from 'react-toastify'

const width = window.innerWidth
const count = width <=400 ? 8 : 12
export const Domains = () => {

    const dispatch = useDispatch()
    const domains = useSelector((store) => store?.project?.category)
    useEffect(() => {
        async function call(){
			axios.get('/api/getallcategories')
			.then(({data})=> {
				dispatch(addCategory(data))
			}).catch((err) => {
                toast.warn("Something went wrong !",{
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition : Bounce
					
				});
            })
		}
		call()
    },[])
    return (
        <div className='px-2 mt-4 md:px-28'>
            <ToastContainer/>
            <div className='flex justify-between items-center'>
                <span className=' font-medium md:text-lg'>Projects by Domains</span>
                <Link to={'/categories'}>
                    <span className='text-primary font-medium text-xs md:text-base md:hidden'>More</span>
                </Link>
                
            </div>
            <div className='mt-3 grid grid-cols-4 md:grid-cols-6 gap-3'>
            {!domains && _.range(1,count).map(item => <DomainCardLoader key={item}/>)}
            </div>
            
            
            
            <div className='mt-3 grid grid-cols-4 md:grid-cols-6 gap-3'>
                {domains?.slice(0,count).map((item,index) => <DomainCard key={index} name={item.title} img={item.icon}/>)}
            </div>
        </div>
    )
}
