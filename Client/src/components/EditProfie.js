import React from "react";
import Navbar from "./Navbar";

import EditProfileForm from "./EditProfileForm";
import Header from './Header'
import Footer from './Footer'
import { Link } from "react-router-dom";


const EditProfile = () => {
	return (
		<div className="bg-slate-50 flex-col mt-16 md:pt-9 ">
			<Navbar title={"Edit Profile"} />
			<Header/>
			<div className="flex gap-2 md:px-44 mb-5">
				<Link to={"/"} className="text-sm text-gray-400 md:text-base">
					Home
				</Link>
				<span className="text-sm text-gray-400 md:text-base">/</span>
				<Link to={"/myprojects"} className="text-sm text-gray-400 font-medium md:text-base">
					Edit Profile
				</Link>
				
			</div>
            <div className="px-4 md:px-44 ">
                <span className="text-gray-500">Provide details about yourself and any other pertinent information</span>
            </div>
            <EditProfileForm/>
			<div className="hidden md:block">
				<Footer/>
			</div>
			
		</div>
	);
};

export default EditProfile;
