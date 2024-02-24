import React from "react";

const DeveloperProfileCard = () => {
	return (
		<div className="bg-gray-100 p-2 flex flex-col items-center">
			<div className="border-[1px] border-primary rounded-full h-16 w-16 p-1">
				<img src={"/img/dev.png"} alt="icon" />
			</div>
			<span className=" font-medium text-center">Muhammed Rafeeq K</span>
			<span className="text-gray-500 text-sm text-center">Web Developer</span>
			<button className="bg-primary p-2 px-8 mt-3 rounded-md flex items-center gap-3 justify-center">
				<i class="bi bi-person-circle text-white"></i>
				<span className="text-white">View Profile</span>
			</button>
		</div>
	);
};

export default DeveloperProfileCard;
