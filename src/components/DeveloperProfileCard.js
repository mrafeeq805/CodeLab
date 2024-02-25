import React from "react";
import DevInfo from "./DevInfo";

const DeveloperProfileCard = () => {
	return (
		<div className="bg-gray-100 p-2 flex flex-col items-center">
			<DevInfo/>
			<button className="bg-primary p-2 px-8 mt-3 rounded-md flex items-center gap-3 justify-center">
				<i class="bi bi-person-circle text-white"></i>
				<span className="text-white">View Profile</span>
			</button>
		</div>
	);
};

export default DeveloperProfileCard;
