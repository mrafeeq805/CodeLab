import React from "react";

const EditProfileForm = () => {
	return (
		<div className="mt-4 p-4">
			<form className="">
				<label className="text-login font-medium ">Full Name</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-3">
					<input className="w-full text-login_light" type="text" />
					<i class="bi bi-x-circle text-login_light text-lg"></i>
				</div>
				<label className="text-login font-medium">Headline</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-3">
					<input className="w-full text-login_light" type="text" />
					<i class="bi bi-x-circle text-login_light text-lg"></i>
				</div>
                <label className="text-login font-medium">Bio</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-3 h-24">
					<textarea className="w-full text-login_light" type="text" />
					
				</div>
				<button className=" bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
					Save
				</button>
				
			</form>
		</div>
	);
};

export default EditProfileForm;
