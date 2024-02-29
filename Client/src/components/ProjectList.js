import React from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import ProjectListSection from './ProjectListSection'

const ProjectList = () => {
  return (
    <div>
        <Navbar title={"Projects"}/>
        <SearchBar title={"Search Projects..."}/>
        <ProjectListSection/>
    </div>
  )
}

export default ProjectList