import React from 'react'
import DeveloperCard from './DeveloperCard'

const TopDevelopers = () => {
    const list = ['1','2','3','4','5']
  return (
    <div className='px-2'>
        <span className='font-medium'>Top Developers</span>
        <div className='mt-3 grid grid-col-5 grid-flow-col'>
            {list.map(item => <DeveloperCard name={"Akshay"} img={"/img/dev.png"}/>)}
        </div>
    </div>
  )
}

export default TopDevelopers