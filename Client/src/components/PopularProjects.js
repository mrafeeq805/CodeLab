import React from 'react'
import ProjectCardSec from './ProjectCardSec'
import { useSelector } from 'react-redux'
import ProjectCardSecLoader from './skelton/ProjectCardSecLoader'

const PopularProjects = () => {
    const list = useSelector((store) => store?.project?.popularProjects)
    const count = [1,2]
    return (
        <div className='px-2 mt-4 md:px-32 my-6'>
            <div className='flex justify-between items-center'>
                <span className=' font-medium md:text-lg'>Popular Projects</span>
                <span className='text-primary font-medium text-xs hidden'>More</span>
            </div>
            {!list && count?.map(item => <ProjectCardSecLoader key={item}/>)}
            
            {list && (<div className='mt-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-2 md:gap-5'>
                {list?.map((item,index) => <ProjectCardSec key={index} data={item}/>)}
            </div>)}
        </div>
    )
}

export default PopularProjects