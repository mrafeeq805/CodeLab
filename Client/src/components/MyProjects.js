import React, { useEffect } from 'react'
import Navbar from './Navbar'
import MyProjecSection from './MyProjecSection'

const MyProjects = () => {
  
  return (
    <div>
        <Navbar title={"My Projects"}/>
        <MyProjecSection />
    </div>
  )
}

export default MyProjects