import React from "react";
import { Skeleton } from "@mui/material";

const ProjectDetailsLoader = ({ details }) => {
	return (
		<div className="">
			<div className="flex flex-col p-3 w-full">
				<div className="flex justify-between items-center">
                    <Skeleton variant="text" width={50} height={20} sx={{ fontSize: "0.8rem" }} />
					<Skeleton variant="text" width={50} height={40} sx={{ fontSize: "0.8rem" }} />
				</div>

				<div className="flex justify-between mt-1 w-full">
                    <Skeleton variant="text" width={50} sx={{ fontSize: "0.8rem" }} />

					<div className="flex gap-1 items-center">
                        <Skeleton variant="text" width={50} sx={{ fontSize: "0.8rem" }} />
					</div>
				</div>
				<div className="mt-4">
                    <Skeleton variant="rounded" sx={{ width: 350 }} height={150} />
					<div className="flex mt-3 gap-5 w-full justify-between">
                        <Skeleton variant="rounded" width={165} height={40} />

						<Skeleton variant="rounded" width={165} height={40} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailsLoader
