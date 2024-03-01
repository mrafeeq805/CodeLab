import React from 'react'
import ProjectCardSec from './ProjectCardSec'
import { useSelector } from 'react-redux'

const LatestProjects = () => {

    const list = useSelector((store) => store?.project?.latestProjects)
    return (
        <div className='px-2 mt-4'>
            <div className='flex justify-between items-center'>
                <span className=' font-medium'>Latest Projects</span>
                <span className='text-primary font-medium text-xs'>More</span>
            </div>
            
            {list && (<div className='mt-3 grid grid-col-5 grid-flow-row gap-2'>
                {list?.map(item => <ProjectCardSec key={item.name} data={item}/>)}
            </div>)}
        </div>
    )
}

export default LatestProjects