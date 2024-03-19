import React from "react";


const ProjectCardSecLoader = () => {
	return (
		<div role="status" class=" animate-pulse flex gap-4 my-2 p-3 md:flex-col">
			<div class="flex items-center justify-center w-36 md:w-full md:h-36 h-24 bg-gray-300 rounded  ">
				<svg
					class="w-10 h-10 text-gray-200 "
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 18">
					<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
				</svg>
			</div>
			<div class=" flex flex-col gap-3">
				<div class="h-2.5 bg-gray-200 rounded-full w-12 "></div>
				<div class="h-2 bg-gray-200 rounded-full w-36"></div>
				<div class="h-2 bg-gray-200 rounded-full w-12"></div>
				<div className="flex justify-between">
					<div class="h-2 bg-gray-200 rounded-full w-10"></div>
					<div class="h-2 bg-gray-200 rounded-full w-10"></div>
					<div class="h-2 bg-gray-200 rounded-full w-10"></div>
				</div>
			</div>
			<span class="sr-only">Loading...</span>
		</div>
	);
};

export default ProjectCardSecLoader;
