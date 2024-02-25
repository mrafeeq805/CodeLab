import React from "react";

const ProjectDetails = () => {
	return (
		<div className="mt-16 px-2">
			<div className="flex flex-col p-3">
				<div className="flex">
					<span className="text-lg">
						5 fastest runner in the world that change your mind
					</span>
					<div className="px-4 h-max bg-green-100 rounded-xs flex justify-center items-center">
						<span className="text-green-500">FREE</span>
					</div>
				</div>

				<div className="flex justify-between mt-1">
					<span className=" text-gray-400">Akshay Saini</span>
					<div className="flex gap-1 items-center">
						<i class="bi bi-clock-fill text-gray-400"></i>
						<span className="text-sm text-gray-400">1 m</span>
					</div>
				</div>
				<div className="mt-4">
					<img
						className="rounded-md h-44 w-full object-cover"
						src="/img/thumb.png"
						alt=""
					/>
                    <div className="flex mt-3 gap-5">
                        <button className="bg-primary p-2 w-full rounded-md flex items-center gap-3 justify-center">
                            <i class="bi bi-laptop text-white"></i>
                            <span className="text-white">Live Demo</span>
                        </button>
                        <button className="bg-gray-400 p-2 w-full rounded-md flex items-center gap-3 justify-center">
                            <i class="bi bi-card-image text-white"></i>
                            <span className="text-white">Screenshots</span>
                        </button>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetails;
