import React from 'react'
import ProjectCardSec from './ProjectCardSec'

const PopularProjects = () => {
    const list = ['1','2']
    return (
        <div className='px-2 mt-4'>
            <div className='flex justify-between items-center'>
                <span className=' font-medium'>Popular Projects</span>
                <span className='text-primary font-medium text-xs'>More</span>
            </div>
            
            <div className='mt-3 grid grid-col-5 grid-flow-row gap-2'>
                {list.map(item => <ProjectCardSec name={"Akshay"} img={"/img/dev.png"}/>)}
            </div>
        </div>
    )
}

export default PopularProjects