import React from "react";
import DevInfo from "./DevInfo";
import { useNavigate } from "react-router-dom";
import DeveloperProfileCardLoader from "./skelton/DeveloperProfileCardLoader";

const DeveloperProfileCard = ({ publisher }) => {
	console.log(publisher?.name);
	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate("/developerinfo/"+publisher?.publisher_id);
	};
	return (
		<div className="">
			{!publisher?.name && <DeveloperProfileCardLoader/>}
			
			{publisher?.name && (<div className="bg-gray-100 p-2 flex flex-col items-center">
				<DevInfo data={publisher} />
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
