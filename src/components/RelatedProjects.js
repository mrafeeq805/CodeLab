import React from "react";
import ProjectCardMain from "./ProjectCardMain";

const RelatedProjects = () => {
    const list = ["1",'2']
	return (
		<div className="px-2 mt-4">
			<div className="flex justify-between items-center">
				<span className=" font-medium">Related Projects</span>
				
			</div>

			<div className="mt-3 grid grid-col-5 grid-flow-row gap-2">
				{list.map((item) => (
					<ProjectCardMain name={"Akshay"} img={"/img/dev.png"} />
				))}
			</div>
		</div>
	);
};

export default RelatedProjects;
