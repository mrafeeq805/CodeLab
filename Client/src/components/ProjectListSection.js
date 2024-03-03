import React, { useEffect, useState } from "react";
import ProjectCardMain from "./ProjectCardMain";
import { useSelector } from "react-redux";
import ProjectCardMainLoader from "./skelton/ProjectCardMainLoader";
import axios from "axios"

const ProjectListSection = () => {
	const [projectList,setProjectList] = useState([])
	useEffect(() =>{
		async function call (){
			await axios.get('/getlatest')
			.then((res) => {
				console.log(res.data);
				setProjectList(res.data)
			})
		}
		call()
	},[])
	//const projectList = useSelector((store) => store?.project?.latestProjects)
	const list = ["1", "2"];
	return (
		<div className="px-4">
            <div className="flex justify-between items-center">
                <span className="font-medium">Projects (2)</span>
                <div className="flex items-center gap-2">
                    <i class="bi bi-sort-down text-primary"></i>
                    <span className="text-primary text-sm">SORT</span>
                </div>
            </div>
			
			<div className="mt-3 grid grid-cols-1 gap-3">
				{projectList.length === 0 && list?.map((item,index) => <ProjectCardMainLoader key={index}/>)}
				{projectList && projectList?.map((item,index) => (
					<ProjectCardMain key={index} data={item} />
				))}
			</div>
		</div>
	);
};

export default ProjectListSection
