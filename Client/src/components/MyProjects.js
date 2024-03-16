import React, { useEffect } from 'react'
import Navbar from './Navbar'
import MyProjecSection from './MyProjecSection'
import Header from './Header'
import Footer from './Footer'

const MyProjects = () => {
  
  return (
    <div>
        <div><Header/></div>
        <Navbar title={"My Projects"}/>
        <MyProjecSection />
        <div className='hidden md:block mt-5'>
          <Footer/>
        </div>
    </div>
  )
}

export default MyProjects