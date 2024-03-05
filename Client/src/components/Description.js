import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProjectDetails from "./ProjectDetails";
import InfoCard from "./InfoCard";
import DeveloperProfileCard from "./DeveloperProfileCard";
import RelatedProjects from "./RelatedProjects";
import DownloadCard from "./DownloadCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@mui/material";
import ScreenshotsCarousel from "./ScreenshotsCarousel";

const Description = () => {
	const [description,setDiscription] = useState(null)
	const { project_id } = useParams();
	const [ssvisible,setSSVisible] = useState(false)
	useEffect(() => {
		async function call() {
			await axios.get("/description/" + project_id).then((res) => {
				setDiscription(res?.data?.[0]);
				
			});
		}
		call();
	}, []);

	return (
		<div className="bg-slate-50 ">
			<Navbar title={"Developer Name"} />
			<ProjectDetails details={description} setSSVisible={setSSVisible} />
			{ssvisible && <ScreenshotsCarousel screenshots={description?.screenshots} setSSVisible={setSSVisible} />}
			<div className="px-3">
				<div className="bg-white p-3 my-3">
					<span className="font-medium text-lg">Overview</span>
					<hr className="my-2"></hr>
					{!description && (<div className="flex flex-col gap-2">
						<Skeleton variant="rounded" width={300} height={5} sx={{ fontSize: "0.8rem" }} />
						<Skeleton variant="rounded" width={250} height={5} sx={{ fontSize: "0.8rem" }} />
					</div>)}
					
					{description && <p>{description?.overview}</p>}
				</div>
				<div className="bg-white p-3 my-3">
					<span className="font-medium text-lg">Features</span>
					<hr className="my-2"></hr>
					{!description && (<div className="flex flex-col gap-2">
						<Skeleton variant="rounded" width={300} height={5} sx={{ fontSize: "0.8rem" }} />
						<Skeleton variant="rounded" width={250} height={5} sx={{ fontSize: "0.8rem" }} />
					</div>)}
					
					{description && <div dangerouslySetInnerHTML={{__html: description?.features}}></div>}
					
					
				</div>
				<InfoCard data={description} />
				<DeveloperProfileCard name={description?.publisher}/>
			</div>
			<RelatedProjects />
			{!ssvisible && <DownloadCard id={description?.project_id} url={description?.project_link} />} 
		</div>
	);
};

export default Description;
