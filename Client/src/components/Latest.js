import React from 'react'
import Navbar from './Navbar'
import LatestProjects from './LatestProjects'

const Latest = () => {
  return (
    <div>
        <Navbar title={"Latest Projects"}/>
        <LatestProjects/>
    </div>
  )
}

export default Latest