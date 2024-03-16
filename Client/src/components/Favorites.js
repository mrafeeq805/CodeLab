import React from 'react'
import Navbar from './Navbar'
import FavoriteSection from './FavoriteSection'
import Header from './Header'
import Footer from './Footer'

const Favorites = () => {
  return (
    <div>
        <Navbar title={"Favorites"}/>
        <Header/>
        <FavoriteSection/>
        <div className='hidden md:block mt-12'>
          <Footer/>
        </div>
    </div>
  )
}

export default Favorites