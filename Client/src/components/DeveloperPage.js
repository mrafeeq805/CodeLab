import React, { useEffect } from "react";
import Navbar from "./Navbar";
import DevInfo from "./DevInfo";
import DevProjecInfo from "./DevProjecInfo";
import MyProjects from "./MyProjects";
import TechStackSection from "./TechStackSection";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addDeveloperProjects, addMyProjects } from "../utils/projectSlice";

const DeveloperPage = () => {
    const user = useSelector((store) => store?.user?.user)

    const dispatch = useDispatch()
    useEffect(() =>{
        async function call (){
            await axios.get('/getDeveloperProjects')
            .then((res) =>{
                console.log(res.data);
                dispatch(addDeveloperProjects(res?.data))
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
			<DevInfo data={user?.name}/>
            <div className=" p-4 px-8">
                <p className="text-gray-500 text-sm text-center">Example : Hey everyone ! I am a designer and blogger. I am exper in HTML ,CSS and Javascript</p>
            </div>
            <DevProjecInfo/>
            <TechStackSection/>
            <MyProjects />
            
		</div>
	);
};

export default DeveloperPage;
