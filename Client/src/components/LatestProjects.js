import React, { useEffect } from "react";
import ProjectCardSec from "./ProjectCardSec";
import { useSelector } from "react-redux";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";

const LatestProjects = () => {
	const count = [1,2]
	const list = useSelector((store) => store?.project?.latestProjects);
	return (
		<div className="px-2 mt-4">
			<div className="flex justify-between items-center">
				<span className=" font-medium">Latest Projects</span>
				<span className="text-primary font-medium text-xs hidden">More</span>
			</div>
			
			{!list && count?.map(item => <ProjectCardSecLoader key={item}/>)}
			

			{list && (
				<div className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-flow-row gap-2">
					{list?.map((item, index) => (
						<ProjectCardSec key={index} data={item} />
					))}
				</div>
			)}
		</div>
	);
};

export default LatestProjects;
