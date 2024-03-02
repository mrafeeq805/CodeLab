import React, { useEffect } from 'react'
import Header from './Header'
import TopDevelopers from './TopDevelopers'
import LatestProjects from './LatestProjects'
import { Domains } from './Domains'
import PopularProjects from './PopularProjects'
import SearchBar from './SearchBar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addLatest, addTopDevelopers } from '../utils/projectSlice'

const Home =  () => {
  
  const dispatch = useDispatch()

   useEffect(() =>{
    async function call (){
      const list = await axios.get('/getlatest')
      dispatch(addLatest(list.data))
      const topDevelopers = await axios.get('/getdevelopers')
      dispatch(addTopDevelopers(topDevelopers.data))

    }
    call()
   },[])
  
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