import React from 'react'
import ProjectCardSec from './ProjectCardSec'
import { useSelector } from 'react-redux'
import ProjectCardSecLoader from './skelton/ProjectCardSecLoader'

const PopularProjects = () => {
    const list = useSelector((store) => store?.project?.latestProjects)
    const count = [1,2]
    return (
        <div className='px-2 mt-4'>
            <div className='flex justify-between items-center'>
                <span className=' font-medium'>Popular Projects</span>
                <span className='text-primary font-medium text-xs'>More</span>
            </div>
            {!list && count.map(item => <ProjectCardSecLoader key={item}/>)}
            
            {list && (<div className='mt-3 grid grid-col-5 grid-flow-row gap-2'>
                {list?.map((item,index) => <ProjectCardSec key={index} data={item}/>)}
            </div>)}
        </div>
    )
}

export default PopularProjects