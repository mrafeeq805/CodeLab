import React from "react";
import Navbar from "./Navbar";
import { profileCardDetails } from "../utils/constants";
import ProfileMenuCard from "./ProfileMenuCard";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const navigate = useNavigate()
	const navigateEditProfile = () => {
		navigate('/editprofile')
	}
	return (
		<div className="bg-slate-50 flex items-center flex-col h-screen">
			<Navbar title={"Profile"} />
			<div className="mt-16 py-4 flex justify-center items-center flex-col">
				<div className="border-[1px] border-primary rounded-full h-16 w-16 p-1">
					<img src={"/img/dev.png"} alt="icon" />
				</div>
				<span className=" font-medium text-center">Muhammed Rafeeq K</span>
				<span className="text-gray-500 text-sm text-center">Web Developer</span>
				<button onClick={navigateEditProfile} className="bg-primary p-2 px-8 mt-3 rounded-full flex items-center gap-3 justify-center">
					<i class="bi bi-pen text-white"></i>
					<span className="text-white">Edit Profile</span>
				</button>
			</div>
			<div className="bg-white rounded-lg p-4 flex flex-col gap-2 w-10/12">
				{profileCardDetails?.map((item) => (
					<ProfileMenuCard icon={item?.icon} title={item?.title} />
				))}
			</div>
			<span className="absolute bottom-3 text-sm text-login_light">
				Designed By <span className="text-primary font-medium">Secure3</span>
			</span>
		</div>
	);
};

export default Profile;
