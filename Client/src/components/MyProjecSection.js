import React, { useEffect } from "react";
import ProjectCardSec, { ProjectCardSecMy } from "./ProjectCardSec";
import { useSelector } from "react-redux";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";

const MyProjecSection = ({data}) => {
	const ProjectCardSecNew = ProjectCardSecMy(ProjectCardSec)
	const count = [1,2]
	return (
		<div className="px-2 mt-16">
            <span className="font-medium">Projects ({ data.length || 0})</span>

			<div className="mt-3 grid grid-col-5 grid-flow-row gap-2">
				{!data && count?.map(item => <ProjectCardSecLoader key={item}/>)}
				{data && data?.map((item,index) => (
					<ProjectCardSecNew key={index} data={item} />
				))}
			</div>
		</div>
	);
};

export default MyProjecSection;
