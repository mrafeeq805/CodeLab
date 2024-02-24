import React from "react";
import ProjectCardMain from "./ProjectCardMain";

const ProjectListSection = () => {
	const list = ["1", "2", "3", "1", "3", "3"];
	return (
		<div className="px-4">
            <div className="flex justify-between items-center">
                <span className="font-medium">Projects (2)</span>
                <div className="flex items-center gap-2">
                    <i class="bi bi-sort-down text-primary"></i>
                    <span className="text-primary text-sm">SORT</span>
                </div>
            </div>
			<div className="mt-3 grid grid-cols-1 gap-3">
				{list.map((item) => (
					<ProjectCardMain name={"Akshay"} img={"/img/dev.png"} />
				))}
			</div>
		</div>
	);
};

export default ProjectListSection
