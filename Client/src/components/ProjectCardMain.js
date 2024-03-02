import React from "react";
import DomainChip from "./DomainChip";

const ProjectCardMain = () => {
	const list = ["React JS","Node JS"]
	return (
		<div className="border-[1px] border-gray-200 rounded-md flex relative">
			<div className="">
				<img
					className="rounded-md h-44 w-full object-cover"
					src="/img/thumb.png"
					alt=""
				/>
				<div className="flex flex-col p-3">
					
					<span className="text-lg">
						5 fastest runner in the world that change your mind
					</span>
					<span className=" text-gray-400">Akshay Saini</span>
					<div className="flex justify-between mt-1">
						<div className="flex gap-1 items-center">
							<i className="bi bi-eye-fill text-gray-400"></i>
							<span className="text-sm text-gray-400">1.5 K</span>
						</div>
						<div className="flex gap-1 items-center">
							<i className="bi bi-arrow-down-circle text-gray-400"></i>
							<span className="text-sm text-gray-400">1.5 K</span>
						</div>
						<div className="flex gap-1 items-center">
							<i className="bi bi-clock-fill text-gray-400"></i>
							<span className="text-sm text-gray-400">1 m </span>
						</div>
						<div className="px-6 bg-light rounded-xs flex justify-center items-center">
							<span className="text-primary">FREE</span>
						</div>

					</div>
				</div>
			</div>
			<div className="absolute flex justify-center items-center top-2 right-2 rounded-full h-10 w-10 bg-gray-300 p-2 bg-opacity-60">
				<i className="bi bi-heart text-primary"></i>
			</div>
			<div className="flex absolute top-2 left-2 gap-2">
				{list.map(item => <DomainChip key={item} title={item}/>)}
			</div>
		</div>
	);
};


export default ProjectCardMain;
