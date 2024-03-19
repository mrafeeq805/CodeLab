import React from "react";

const ProjectDetailsLoader = ({ details }) => {
	return (
		<div role="status" class=" animate-pulse flex gap-1 my-2">
			<div className="flex flex-col p-3 w-full gap-3">
				<div className="flex justify-between items-center md:hidden">
					<div class="h-2.5 bg-gray-200 rounded-full w-24 "></div>
					<div class="h-2.5 bg-gray-200 rounded-full w-12 "></div>
				</div>

				<div className="flex justify-between mt-1 w-full md:hidden">
					<div class="h-2.5 bg-gray-200 rounded-full w-12 "></div>
					<div class="h-2.5 bg-gray-200 rounded-full w-16 "></div>
				</div>
				<div className="mt-4">
					<div class="h-44 md:h-96 bg-gray-200 rounded-lg w-full flex justify-center items-center ">
						
						<svg
							class="w-10 h-10 fill-gray-600 "
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							
							viewBox="0 0 20 18">
							<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
						</svg>
					</div>

					<div className="flex mt-3 gap-5 w-full justify-between md:hidden">
						<div class="h-12 bg-gray-200 rounded-lg w-full "></div>
						<div class="h-12 bg-gray-200 rounded-lg w-full "></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailsLoader;
