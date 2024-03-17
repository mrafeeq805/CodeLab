import React, { useEffect } from "react";
import ProjectCardSec from "./ProjectCardSec";
import { useSelector } from "react-redux";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";
const width = window.innerWidth
const count = width <=400 ? 2 : 8
const LatestProjects = () => {
	const countd = [1,2]

	const list = useSelector((store) => store?.project?.latestProjects);
	return (
		<div className="px-2 mt-4 md:px-28 ">
			<div className="flex justify-between items-center">
				<span className=" font-medium md:text-lg">Latest Projects</span>
				<span className="text-primary font-medium text-xs hidden">More</span>
			</div>
			
			{!list && countd?.map(item => <ProjectCardSecLoader key={item}/>)}
			

			{list && (
				<div className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-3 grid-flow-row gap-2">
					{list?.slice(0,count).map((item, index) => (
						<ProjectCardSec key={index} data={item} />
					))}
				</div>
			)}
		</div>
	);
};

export default LatestProjects;
