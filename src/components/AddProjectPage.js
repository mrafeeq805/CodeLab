import React from "react";
import Navbar from "./Navbar";
import Screenshots from "./Screenshots";
import UploadThumbanail from "./UploadThumbanail";
import FeaturesInput from "./FeaturesInput";

const AddProjectPage = () => {
	return (
		<div className="mt-16">
			<Navbar title={"Add Project"} />
			<form className="px-3">
				<label className="text-login font-medium ">Title</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input className="w-full text-login_light" type="text" />
				</div>
                <label className="text-login font-medium ">Category</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input className="w-full text-login_light" type="text" />
				</div>
				<label className="text-login font-medium">Live Link</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input className="w-full text-login_light" type="text" />
				</div>
                <label className="text-login font-medium">Overview</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<textarea className="w-full text-login_light min-h-24" />
				</div>
                <Screenshots/>
                <UploadThumbanail/>
                <FeaturesInput/>
			</form>
		</div>
	);
};

export default AddProjectPage;
