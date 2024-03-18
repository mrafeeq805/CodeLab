
import React from "react";

const InformationCardLoader = () => {
	const list = [1, 2, 3, 4, 5];
	return (
		<div className="grid grid-cols-1">
			{list.map((item) => (
			
			<div role="status" class=" animate-pulse flex gap-1 my-1">
                <div class="h-14 bg-gray-200 w-full "></div>

				<span class="sr-only">Loading...</span>
			</div>
            ))}
		</div>
	);
};

export default InformationCardLoader;
