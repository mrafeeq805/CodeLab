import React, { useState } from "react";
import { useSelector } from "react-redux";
import { calcDate } from "../utils/dateDifference";
import ProjectDetailsLoader from "./skelton/ProjectDetailsLoader";

const ProjectDetails = ({details,setSSVisible}) => {
	

	return (
		
		<div className="mt-16 md:mt-4 px-2 bg-white my-5">
			{!details && <ProjectDetailsLoader/>}
			{details && (<div className="flex flex-col p-3 w-full">
				<div className="flex justify-between md:hidden">
					<span className="md:text-2xl text-xl md:font-medium">
						{details?.title}
					</span>
					<div className="px-4 h-max bg-green-100 rounded-xs md:hidden flex justify-center items-center">
						<span className="text-green-500">{details?.price}</span>
					</div>
				</div>

				<div className="flex md:hidden justify-between md:justify-normal md:gap-10 mt-1 w-full">
					<div className="">
						<span className=" text-gray-400 md:text-lg">{details?.publisher}</span>
					</div>

					<div className="flex gap-1 items-center">
						<i className="bi bi-clock text-gray-400"></i>
						<span className="text-sm text-gray-400 md:text-base">{calcDate(details?.published_date).result+" ago" || "New"}</span>
					</div>
				</div>
				<div className="mt-4">
					<img
						className="rounded-md h-44 w-full object-cover md:h-96"
						src={details?.thumbnail}
						alt=""
					/>
                    <div className="flex mt-3 gap-5">
						<a className="w-full" href={details?.live_link} target="_blank" rel="noreferrer">
							<button className="bg-primary p-2 w-full rounded-md flex items-center gap-3 justify-center">
                            	<i className="bi bi-laptop text-white"></i>
                            	<span className="text-white">Live Demo</span>
                        	</button>
						</a>
                        
                        <button onClick={() => setSSVisible(true)} className="bg-gray-400 p-2 w-full rounded-md flex items-center gap-3 justify-center">
                            <i className="bi bi-card-image text-white"></i>
                            <span className="text-white">Screenshots</span>
                        </button>
                    </div>
				</div>
			</div>)}
		</div>
	);
};

export default ProjectDetails;
