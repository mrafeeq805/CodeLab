import React from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import CategoriesSection from './CategoriesSection'

const Categories = () => {
  return (
    <div>
        <Navbar title={"Categories"}/>
        <SearchBar title={"Search Categories..."}/>
        <CategoriesSection/>
    </div>
  )
}

export default Categories