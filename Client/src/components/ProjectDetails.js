import React from "react";
import { useSelector } from "react-redux";

const ProjectDetails = () => {
	const details = useSelector((store) => store?.project?.description)
	return (
		<div className="mt-16 px-2">
			<div className="flex flex-col p-3 w-full">
				<div className="flex justify-between">
					<span className="text-lg">
						{details?.title}
					</span>
					<div className="px-4 h-max bg-green-100 rounded-xs flex justify-center items-center">
						<span className="text-green-500">{details?.price}</span>
					</div>
				</div>

				<div className="flex justify-between mt-1 w-full">
					<div className="">
						<span className=" text-gray-400 ">{details?.publisher}</span>
					</div>

					<div className="flex gap-1 items-center">
						<i className="bi bi-clock-fill text-gray-400"></i>
						<span className="text-sm text-gray-400">{details?.published_date}</span>
					</div>
				</div>
				<div className="mt-4">
					<img
						className="rounded-md h-44 w-full object-cover"
						src={details?.thumbnail}
						alt=""
					/>
                    <div className="flex mt-3 gap-5">
                        <button className="bg-primary p-2 w-full rounded-md flex items-center gap-3 justify-center">
                            <i className="bi bi-laptop text-white"></i>
                            <span className="text-white">Live Demo</span>
                        </button>
                        <button className="bg-gray-400 p-2 w-full rounded-md flex items-center gap-3 justify-center">
                            <i className="bi bi-card-image text-white"></i>
                            <span className="text-white">Screenshots</span>
                        </button>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetails;
