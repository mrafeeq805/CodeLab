import React from "react";
import DeveloperCard from "./DeveloperCard";
import { useSelector } from "react-redux";
import DevelopersLoader from "./skelton/DevelopersLoader";

const TopDevelopers = () => {
	const list = useSelector((store) => store?.project?.topDevelopers);
	return (
		<div className="px-2">
			<span className="font-medium">Top Developers</span>
			{!list && (<div className="h-16">
				<DevelopersLoader/>
			</div>
			)}

			<div className="mt-3 grid grid-cols-5 grid-flow-col">
				{list?.map((item, index) => (
					<DeveloperCard key={index} name={item?.name} avatar={item?.avatar} id={item?.publisher_id} />
				))}
			</div>
		</div>
	);
};

export default TopDevelopers;
