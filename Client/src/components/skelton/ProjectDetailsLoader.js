import React from "react";

const ProjectDetailsLoader = ({ details }) => {
	return (
		<div role="status" class=" animate-pulse flex gap-1 my-2">
			<div className="flex flex-col p-3 w-full gap-3">
				<div className="flex justify-between items-center">
					<div class="h-2.5 bg-gray-200 rounded-full w-24 "></div>
					<div class="h-2.5 bg-gray-200 rounded-full w-12 "></div>
				</div>

				<div className="flex justify-between mt-1 w-full">
					<div class="h-2.5 bg-gray-200 rounded-full w-12 "></div>
					<div class="h-2.5 bg-gray-200 rounded-full w-16 "></div>
					
				</div>
				<div className="mt-4">
				
					<div class="h-36 bg-gray-200 rounded-lg w-full "></div>
					
					<div className="flex mt-3 gap-5 w-full justify-between">
						<div class="h-12 bg-gray-200 rounded-lg w-full "></div>
						<div class="h-12 bg-gray-200 rounded-lg w-full "></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailsLoader;
