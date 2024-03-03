import React from "react";
import { Skeleton } from "@mui/material";

const ProjectCardSecLoader = () => {
	return (
		<div className="flex gap-4 my-2">
			<Skeleton variant="rounded" width={150} height={90} />
			<div className="flex flex-col gap-1">
				<Skeleton variant="text" width={50} sx={{ fontSize: "0.8rem" }} />
				<Skeleton variant="text" width={200} sx={{ fontSize: "0.5rem" }} />
				<Skeleton variant="text" width={100} sx={{ fontSize: "0.5rem" }} />
                <div className="flex justify-between mt-2">
                    <Skeleton variant="text" width={40} sx={{ fontSize: '0.6rem' }} />
                    <Skeleton variant="text" width={40} sx={{ fontSize: '0.6rem' }} />
                    <Skeleton variant="text" width={40} sx={{ fontSize: '0.6rem' }} />
                </div>
			</div>
		</div>
	);
};

export default ProjectCardSecLoader;
