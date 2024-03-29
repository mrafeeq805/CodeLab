import React, { useEffect, useState } from "react";
import ProjectCardSec, { ProjectCardSecMy } from "./ProjectCardSec";
import { useDispatch, useSelector } from "react-redux";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";
import axios from "axios";
import { addMyProjects } from "../utils/projectSlice";
import { Link, useNavigate } from "react-router-dom";
import EmptyCard from "./EmptyCard";
import {Bounce, ToastContainer, toast} from 'react-toastify'

const MyProjecSection = ({ data }) => {
	const ProjectCardSecNew = ProjectCardSecMy(ProjectCardSec);
	const count = [1, 2];
	const myProjects = useSelector((store) => store?.project.myProjects);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [emptyData,setEmptyData] = useState(false)
	useEffect(() => {
		async function call() {
			await axios
				.get("/api/getMyProjects")
				.then(({ data }) => {
					if (data?.status) {
						if(data?.data.length === 0){
							setEmptyData(true)
						}else{
							dispatch(addMyProjects(data?.data));
							setEmptyData(false)
						}
						
					} else {
						navigate("/login");
					}
				})
				.catch((err) => {
					toast.warn("Something went wrong !",{
						position: "top-center",
						autoClose: 2000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition : Bounce
						
					});
				});
		}
		call();
	}, []);
	return (
		<div className="px-2 mt-4 md:mt-24 md:px-24 ">
			<ToastContainer/>
			<div className="hidden md:flex gap-2 mb-5">
					<Link to={'/'} className="text-sm text-gray-400 md:text-base">Home</Link>
					<span className="text-sm text-gray-400 md:text-base">/</span>
					<span className="text-sm text-gray-400 md:text-base font-medium">My Projects</span>
				</div>
			{!emptyData && <span className="font-medium">Projects ({myProjects.length || 0})</span>}
			{ emptyData &&  (<EmptyCard 
					title={"Project Empty"} 
					img={"/img/project_empty.png"} 
					des={"Projects not found. Start adding projects to enhance your skills"}
				/>)}
			<div className="mt-3 grid md:grid-cols-4 grid-flow-row gap-2">
				{myProjects.length === 0 && !emptyData && count?.map((item) => <ProjectCardSecLoader key={item} />)}
				{
					myProjects?.map((item, index) => (
						<ProjectCardSecNew key={index} data={item} />
					))}
			</div>
		</div>
	);
};

export default MyProjecSection;
