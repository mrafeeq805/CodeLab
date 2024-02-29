import React from 'react'
import Header from './Header'
import TopDevelopers from './TopDevelopers'
import LatestProjects from './LatestProjects'
import { Domains } from './Domains'
import PopularProjects from './PopularProjects'
import SearchBar from './SearchBar'

const Home = () => {
  return (
    <div>
        <Header/>
        <SearchBar title={"Search Projects..."}/>
        <TopDevelopers/>
        <LatestProjects/>
        <Domains/>
        <PopularProjects/>
    </div>
  )
}

export default Home