import React from 'react'
import ProjectCardSec from './ProjectCardSec'
import { useSelector } from 'react-redux'
import ProjectCardSecLoader from './skelton/ProjectCardSecLoader'
import _ from 'lodash'
const width = window.innerWidth
const count = width <=400 ? 2 : 8


const PopularProjects = () => {
    const list = useSelector((store) => store?.project?.popularProjects)
    const countd = [1,2]

    return (
        <div className='px-2 mt-4 md:px-28 my-6'>
            <div className='flex justify-between items-center'>
                <span className=' font-medium md:text-lg'>Popular Projects</span>
                <span className='text-primary font-medium text-xs hidden'>More</span>
            </div>
            
            {!list && (<div className='mt-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-2 md:gap-3'>
                {_.range(1,count).map(item => <ProjectCardSecLoader key={item}/>)}
            </div>)}
            {list && (<div className='mt-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-2 md:gap-3'>
                {list?.slice(0,count).map((item,index) => <ProjectCardSec key={index} data={item}/>)}
            </div>)}
        </div>
    )
}

export default PopularProjects