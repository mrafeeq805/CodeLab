import React, { useEffect, useState } from "react";
import ProjectCardSec, { ProjectCardSecMy } from "./ProjectCardSec";
import { useDispatch, useSelector } from "react-redux";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";
import axios from "axios";
import { addMyProjects } from "../utils/projectSlice";
import { useNavigate } from "react-router-dom";
import EmptyCard from "./EmptyCard";

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
				.get("/getMyProjects")
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
					console.log(err);
				});
		}
		call();
	}, []);
	return (
		<div className="px-2 mt-16">
			{!emptyData && <span className="font-medium">Projects ({myProjects.length || 0})</span>}
			{ emptyData &&  (<EmptyCard 
					title={"Project Empty"} 
					img={"/img/project_empty.png"} 
					des={"Projects not found. Start adding projects to enhance your skills"}
				/>)}
			<div className="mt-3 grid grid-col-5 grid-flow-row gap-2">
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
