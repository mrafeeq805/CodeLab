import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProjectDetails from "./ProjectDetails";
import InfoCard from "./InfoCard";
import DeveloperProfileCard from "./DeveloperProfileCard";
import RelatedProjects from "./RelatedProjects";
import DownloadCard from "./DownloadCard";
import { useParams } from "react-router-dom";
import axios from "axios";

const Description = () => {
	const [description,setDiscription] = useState(null)
	const { project_id } = useParams();
	useEffect(() => {
		async function call() {
			await axios.get("/description/" + project_id).then((res) => {
				setDiscription(res?.data?.[0]);
				
			});
		}
		call();
	}, []);

	return (
		<div className="bg-slate-50 relative">
			<Navbar title={"Developer Name"} />
			<ProjectDetails details={description} />
			<div className="px-3">
				<div className="bg-white p-3 my-3">
					<span className="font-medium text-lg">Overview</span>
					<hr className="my-2"></hr>
					<p>{description?.overview}</p>
				</div>
				<div className="bg-white p-3 my-3">
					<span className="font-medium text-lg">Features</span>
					<hr className="my-2"></hr>
					
					<div dangerouslySetInnerHTML={{__html: description?.features}}></div>
					
					
				</div>
				<InfoCard data={description} />
				<DeveloperProfileCard name={description?.publisher}/>
			</div>
			<RelatedProjects />
			<DownloadCard id={description?.project_id} url={description?.project_link} />
		</div>
	);
};

export default Description;
