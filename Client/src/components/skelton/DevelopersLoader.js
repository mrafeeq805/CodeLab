
import React from "react";
import _ from 'lodash'

const width = window.innerWidth
const count = width <=400 ? 5 : 10

const DevelopersLoader = () => {
	return (
		<div className="grid grid-cols-5 md:grid-cols-10 md:gap-4 ">
			{_.range(1,count).map((item => (
			<div role="status" class=" animate-pulse flex flex-col items-center justify-center gap-2 my-2">
				<div class="flex flex-col items-center justify-center  gap-3 bg-gray-300 rounded-full h-16 md:h-20 w-16 md:w-20">

					
				</div>
				<div class="h-2.5 bg-gray-200 rounded-full w-12 "></div>

				<span class="sr-only">Loading...</span>
			</div>)
			))}
		</div>
	);
};

export default DevelopersLoader;
