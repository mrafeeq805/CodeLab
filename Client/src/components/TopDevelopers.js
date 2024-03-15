import React from "react";
import DeveloperCard from "./DeveloperCard";
import { useSelector } from "react-redux";
import DevelopersLoader from "./skelton/DevelopersLoader";
import { Link } from "react-router-dom";

const TopDevelopers = () => {
	const list = useSelector((store) => store?.project?.topDevelopers);
	return (
		<div className="px-2 md:px-32 md:mt-5">
			<div className="flex justify-between">
				<span className="font-medium md:text-lg">Top Developers</span>
				<Link to={"/developers"}>
					<span className="text-primary font-medium text-xs md:text-base">More</span>
				</Link>
			</div>

			{!list && (
				<div className="h-16">
					<DevelopersLoader />
				</div>
			)}

			<div className="mt-3 grid grid-cols-5 md:grid-cols-12 grid-flow-col">
				{list?.map((item, index) => (
					<DeveloperCard
						key={index}
						name={item?.name}
						avatar={item?.avatar}
						id={item?.publisher_id}
					/>
				))}
			</div>
		</div>
	);
};

export default TopDevelopers;
