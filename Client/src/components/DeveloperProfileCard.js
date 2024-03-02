import React from "react";
import DevInfo from "./DevInfo";
import { useNavigate } from "react-router-dom";

const DeveloperProfileCard = ({name}) => {
	const navigate = useNavigate()
	const handleNavigate = () =>{
		navigate('/developerinfo')
	}
	return (
		<div className="bg-gray-100 p-2 flex flex-col items-center">
			<DevInfo data={name}/>
			<button onClick={handleNavigate} className="bg-primary p-2 px-8 mt-3 rounded-md flex items-center gap-3 justify-center">
				<i className="bi bi-person-circle text-white"></i>
				<span className="text-white">View Profile</span>
			</button>
		</div>
	);
};

export default DeveloperProfileCard;
