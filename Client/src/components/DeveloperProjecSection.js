import React, { useEffect, useState } from "react";
import ProjectCardSec, { ProjectCardSecRemove } from "./ProjectCardSec";
import { useSelector } from "react-redux";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";
import EmptyCard from "./EmptyCard"

const DeveloperProjecSection = ({developerProjects}) => {

	//const developerProjects = useSelector((store) => store?.project?.developerProjects)
	const count = [1,2]
	return (
		<div className="px-2 mt-4">
            <span className="font-medium">Projects ({ developerProjects ? developerProjects.length : 0})</span>

			<div className="mt-3 grid grid-col-5 grid-flow-row gap-2">

				{developerProjects.length === 0 && count?.map(item => <ProjectCardSecLoader key={item}/>)}
				{developerProjects.length > 0 && developerProjects?.map((item,index) => (
					<ProjectCardSec key={index} data={item} />
				))}
			</div>
		</div>
	);
};

export default DeveloperProjecSection;
