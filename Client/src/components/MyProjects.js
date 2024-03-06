import React, { useEffect } from 'react'
import Navbar from './Navbar'
import MyProjecSection from './MyProjecSection'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addMyProjects } from '../utils/projectSlice'

const MyProjects = () => {
  const myProjects = useSelector((store) => store?.project.myProjects)
  const dispatch = useDispatch()
  useEffect(() =>{
    async function call (){
        await axios.get('/getMyProjects/CD1')
        .then((res) =>{
            dispatch(addMyProjects(res?.data))
        })
        .catch((err) =>{
            console.log(err);
        })
    }
    call()
},[])
  return (
    <div>
        <Navbar title={"My Projects"}/>
        {myProjects && <MyProjecSection data = {myProjects}/>}
    </div>
  )
}

export default MyProjects