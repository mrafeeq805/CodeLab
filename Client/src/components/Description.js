import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProjectDetails from "./ProjectDetails";
import DetailsCard from "./DetailsCard";
import InfoCard from "./InfoCard";
import DeveloperProfileCard from "./DeveloperProfileCard";
import RelatedProjects from "./RelatedProjects";
import DownloadCard from "./DownloadCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addDescription } from "../utils/projectSlice";

const Description = () => {
	const description = useSelector((store) => store?.project?.description)
	const {project_id} = useParams()
	const dispatch = useDispatch()
	useEffect(() =>{
		async function call (){
			await axios.get("/description/"+project_id)
			.then((res) =>{
				dispatch(addDescription(res?.data?.[0]))
				
			})
		}
		call()
	},[])

	return (
		<div className="bg-slate-50 relative">
			<Navbar title={"Developer Name"} />
			<ProjectDetails />
			<div className="px-3">
				<DetailsCard
					title={"Overview"}
					description={description?.overview}
				/>
				<DetailsCard
					title={"Features"}
					description={description?.features}
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
