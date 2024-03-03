import { Skeleton } from "@mui/material";
import React from "react";

const ProjectCardMainLoader = () => {
	return (
		<div className="flex gap-4 my-2 flex-col border-2 p-2 rounded-lg">
			<Skeleton variant="rounded" sx={{width:340}} height={150} />
			<div className="flex flex-col gap-1">
				<Skeleton variant="text" width={50} sx={{ fontSize: "0.8rem" }} />
				<Skeleton variant="text" width={200} sx={{ fontSize: "0.5rem" }} />
				<div className="flex justify-between mt-2">
					<Skeleton variant="text" width={40} sx={{ fontSize: "0.6rem" }} />
					<Skeleton variant="text" width={40} sx={{ fontSize: "0.6rem" }} />
                    <Skeleton variant="text" width={40} sx={{ fontSize: "0.6rem" }} />
                    <Skeleton variant="rounded" width={70} height={30} />
				</div>
			</div>
		</div>
	);
};

export default ProjectCardMainLoader;
