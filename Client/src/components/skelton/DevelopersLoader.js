import { Skeleton } from "@mui/material";
import React from "react";

const DevelopersLoader = () => {
	return (
		<div className="grid grid-cols-5 mt-2">
			<div className="flex flex-col justify-center items-center">
				<Skeleton variant="circular" width={60} height={60} />
				<Skeleton variant="text" width={40} sx={{ fontSize: "0.6rem" }} />
			</div>
            <div className="flex flex-col justify-center items-center">
				<Skeleton variant="circular" width={60} height={60} />
				<Skeleton variant="text" width={40} sx={{ fontSize: "0.6rem" }} />
			</div>
            <div className="flex flex-col justify-center items-center">
				<Skeleton variant="circular" width={60} height={60} />
				<Skeleton variant="text" width={40} sx={{ fontSize: "0.6rem" }} />
			</div>
            <div className="flex flex-col justify-center items-center">
				<Skeleton variant="circular" width={60} height={60} />
				<Skeleton variant="text" width={40} sx={{ fontSize: "0.6rem" }} />
			</div>
            <div className="flex flex-col justify-center items-center">
				<Skeleton variant="circular" width={60} height={60} />
				<Skeleton variant="text" width={40} sx={{ fontSize: "0.6rem" }} />
			</div>
		</div>
	);
};

export default DevelopersLoader;
