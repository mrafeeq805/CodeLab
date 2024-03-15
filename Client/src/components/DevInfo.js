import React from "react";

const DevInfo = ({data}) => {
	return (
		<div className="flex flex-col justify-center items-center md:flex-row md:gap-5">
			<div className="border-[1px] border-primary rounded-full h-16 w-16 p-1 md:h-24 md:w-24">
				<img className="h-full w-full rounded-full object-cover" src={data?.avatar} alt="icon" />
			</div>
			<div className="flex flex-col ">
				<span className=" font-medium text-center md:text-xl">{data?.name}</span>
				<span className=" text-center md:text-lg text-gray-500">{data?.title}</span>
			</div>
			
			
		</div>
	);
};

export default DevInfo;
