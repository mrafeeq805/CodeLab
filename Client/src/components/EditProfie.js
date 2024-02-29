import React from "react";
import Navbar from "./Navbar";
import EditProfileAvatar from "./EditProfileAvatar";
import EditProfileForm from "./EditProfileForm";


const EditProfile = () => {
	return (
		<div className="bg-slate-50 flex-col mt-16 ">
			<Navbar title={"Edit Profile"} />
            <div className="px-4">
                <span className="text-gray-500">Provide details about yourself and any other pertinent information</span>
            </div>
            <EditProfileAvatar/>
            <EditProfileForm/>
			
		</div>
	);
};

export default EditProfile;
