import React, { useEffect, useState } from "react";
import ProjectCardSec, { ProjectCardSecRemove } from "./ProjectCardSec";
import axios from "axios";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";

const FavoriteSection = () => {
    const list = ['1','2']
	const [favoriteProjects,setFavoriteProjects] = useState([])
	useEffect(() => {
		async function call() {
			await axios.get("/getlatest").then((res) => {
				setFavoriteProjects(res?.data);
			});
		}
		call();
	}, []);
    const ProjectCardSecNew = ProjectCardSecRemove(ProjectCardSec)
	return (
		<div className="px-2 mt-16">
            <span className="font-medium">Projects (2)</span>

			<div className="mt-3 grid grid-col-5 grid-flow-row gap-2">
				{favoriteProjects.length === 0 && list?.map(item => <ProjectCardSecLoader key={item}/>)}
				{favoriteProjects && favoriteProjects?.map((item) => (
					<ProjectCardSec data={item} />
				))}
			</div>
		</div>
	);
};

export default FavoriteSection
