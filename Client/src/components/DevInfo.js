import React from "react";

const DevInfo = ({data}) => {
	return (
		<div className="flex flex-col justify-center items-center">
			<div className="border-[1px] border-primary rounded-full h-16 w-16 p-1">
				<img src={"/img/dev.png"} alt="icon" />
			</div>
			<span className=" font-medium text-center">{data}</span>
			<span className="text-gray-500 text-sm text-center">Web Developer</span>
		</div>
	);
};

export default DevInfo;
