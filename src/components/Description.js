import React from "react";
import Navbar from "./Navbar";
import ProjectDetails from "./ProjectDetails";
import DetailsCard from "./DetailsCard";
import InfoCard from "./InfoCard";
import DeveloperProfileCard from "./DeveloperProfileCard";
import LatestProjects from "./LatestProjects";
import RelatedProjects from "./RelatedProjects";
import DownloadCard from "./DownloadCard";

const Description = () => {
	return (
		<div className="bg-slate-50 ">
			<Navbar title={"Developer Name"} />
			<ProjectDetails />
			<div className="px-3">
				<DetailsCard
					title={"Overview"}
					description={
						"FPPlatform is the fixed-price marketplace software that is capable to launch fiverr clones, microworkers, etc. Ideal for micro jobs, tasks, errands, etc marketplace where consumers outsource micro tasks or sellers offer micro online and offline services."
					}
				/>
				<DetailsCard
					title={"Features"}
					description={
						"FPPlatform is the fixed-price marketplace software that is capable to launch fiverr clones, microworkers, etc. Ideal for micro jobs, tasks, errands, etc marketplace where consumers outsource micro tasks or sellers offer micro online and offline services."
					}
				/>
				<DetailsCard
					title={"Requirements"}
					description={
						"FPPlatform is the fixed-price marketplace software that is capable to launch fiverr clones, microworkers, etc. Ideal for micro jobs, tasks, errands, etc marketplace where consumers outsource micro tasks or sellers offer micro online and offline services."
					}
				/>
				<DetailsCard
					title={"Instructions"}
					description={
						"FPPlatform is the fixed-price marketplace software that is capable to launch fiverr clones, microworkers, etc. Ideal for micro jobs, tasks, errands, etc marketplace where consumers outsource micro tasks or sellers offer micro online and offline services."
					}
				/>
                <InfoCard/>
                <DeveloperProfileCard/>
			</div>
            <RelatedProjects/>
            <DownloadCard/>
            
		</div>
	);
};

export default Description;
