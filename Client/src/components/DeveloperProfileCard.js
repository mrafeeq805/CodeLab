import React from "react";
import DevInfo from "./DevInfo";
import { useNavigate } from "react-router-dom";
import DeveloperProfileCardLoader from "./skelton/DeveloperProfileCardLoader";

const DeveloperProfileCard = ({ name,publisher_id }) => {
	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate("/developerinfo/"+publisher_id);
	};
	return (
		<div>
			{!name && <DeveloperProfileCardLoader/>}
			
			{name && (<div className="bg-gray-100 p-2 flex flex-col items-center">
				<DevInfo data={name} />
				<button
					onClick={handleNavigate}
					className="bg-primary p-2 px-8 mt-3 rounded-md flex items-center gap-3 justify-center">
					<i className="bi bi-person-circle text-white"></i>
					<span className="text-white">View Profile</span>
				</button>
			</div>)}
		</div>
	);
};

export default DeveloperProfileCard;
