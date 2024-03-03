import React from "react";
import ProjectCardSec, { ProjectCardSecRemove } from "./ProjectCardSec";
import { useSelector } from "react-redux";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";

const MyProjecSection = () => {
	const developerProjects = useSelector((store) => store?.project?.developerProjects)
    const ProjectCardSecNew = ProjectCardSecRemove(ProjectCardSec)
	const count = [1,2]
	return (
		<div className="px-2 mt-4">
            <span className="font-medium">Projects (2)</span>

			<div className="mt-3 grid grid-col-5 grid-flow-row gap-2">
				{!developerProjects && count.map(item => <ProjectCardSecLoader key={item}/>)}
				{developerProjects?.map((item,index) => (
					<ProjectCardSec key={index} data={item} />
				))}
			</div>
		</div>
	);
};

export default MyProjecSection;
