import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DevInfo from "./DevInfo";
import DevProjecInfo from "./DevProjecInfo";
import MyProjects from "./MyProjects";
import TechStackSection from "./TechStackSection";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addDeveloperProjects, addMyProjects } from "../utils/projectSlice";
import { useParams } from "react-router-dom";

const DeveloperPage = () => {
    const user = useSelector((store) => store?.user?.user)
    const [devinfo,setDevinfo] = useState(null)
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(() =>{
        async function call (){
            await axios.get('/getDeveloperProjects/'+id)
            .then((res) =>{
                dispatch(addDeveloperProjects(res?.data?.projects))
                setDevinfo(res?.data)
                console.log(devinfo);
            })
            .catch((err) =>{
                console.log(err);
            })
        }
        call()
    },[])
	return (
		<div className="bg-slate-50 flex-col mt-16 ">
			<Navbar title={"Developer Name"} />
			<DevInfo data={devinfo?.details}/>
            <div className=" p-4 px-8">
                <p className="text-gray-500 text-sm text-center">{devinfo?.details?.bio}</p>
            </div>
            <DevProjecInfo views = {devinfo?.views} projects={devinfo?.projectsCount}/>
            <TechStackSection/>
            
            <MyProjects/>
		</div>
	);
};

export default DeveloperPage;
