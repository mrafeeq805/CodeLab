import React from "react";

const EditProfileAvatar = () => {
	return (
		<div className="flex mt-4 justify-between items-center px-4">
			<div className="flex flex-col">
				<span className="text-xl font-medium">Basic Information</span>
                <div className="mt-2 flex flex-col">
                    <span>Profile Photo</span>
				    <span className="text-gray-400 text-sm">Recommonded 300 * 300</span>
                </div>
				
				<div className="flex gap-3 mt-2">
					<button className="border-2 rounded-md px-4 p-1 text-sm">
						Change
					</button>
					<button className="border-2 rounded-md px-4 p-1 text-sm">
						Remove
					</button>
				</div>
			</div>
			<div>
				<div className="border-[1px] border-primary rounded-full h-16 w-16 p-1">
					<img src={"/img/dev.png"} alt="icon" />
				</div>
			</div>
		</div>
	);
};

export default EditProfileAvatar;
