import React, { useEffect, useState } from "react";
import ProjectCardMain from "./ProjectCardMain";
import axios from "axios";
import ProjectCardMainLoader from "./skelton/ProjectCardMainLoader";
import { useParams } from "react-router-dom";

const RelatedProjects = () => {
    const list = ["1",'2']
	const {category} = useParams()
	const [relatedProjects,setRelatedProjects] = useState([])
	useEffect(() => {
		async function call() {
			await axios.get("/getrelated/"+category).then((res) => {
				setRelatedProjects(res?.data);
			});
		}
		call();
	}, []);
	return (
		<div className="px-2 mt-4 mb-24 ">
			<div className="flex justify-between items-center">
				<span className=" font-medium">Related Projects</span>
				
			</div>

			<div className="mt-3 grid grid-col-5 grid-flow-row gap-2">
				{relatedProjects.length === 0 && list?.map(item => <ProjectCardMainLoader key={item}/>)}
				{relatedProjects && relatedProjects?.map((item,index) => (
					<ProjectCardMain key={index} data={item} />
				))}
			</div>
		</div>
	);
};

export default RelatedProjects;
