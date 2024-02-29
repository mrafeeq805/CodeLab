import React from "react";
import ProjectCardSec, { ProjectCardSecRemove } from "./ProjectCardSec";

const MyProjecSection = () => {
    const list = ['1','2']
    const ProjectCardSecNew = ProjectCardSecRemove(ProjectCardSec)
	return (
		<div className="px-2 mt-4">
            <span className="font-medium">Projects (2)</span>

			<div className="mt-3 grid grid-col-5 grid-flow-row gap-2">
				{list.map((item) => (
					<ProjectCardSecNew name={"Akshay"} img={"/img/dev.png"} />
				))}
			</div>
		</div>
	);
};

export default MyProjecSection;
