import React from "react";
import ProjectCardMain from "./ProjectCardMain";

const ProjectListSection = () => {
	const list = ["1", "2", "3", "1", "3", "3"];
	return (
		<div className="px-4">
			<div className="mt-3 grid grid-cols-1 gap-3">
				{list.map((item) => (
					<ProjectCardMain name={"Akshay"} img={"/img/dev.png"} />
				))}
			</div>
		</div>
	);
};

export default ProjectListSection
