import React, { useEffect, useState } from "react";
import ProjectCardSec, { ProjectCardSecRemove } from "./ProjectCardSec";
import axios from "axios";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";
import { useSelector } from "react-redux";

const FavoriteSection = () => {
    const list = ['1','2']
	const [favoriteProjects,setFavoriteProjects] = useState([])
	const favorites = useSelector((store) => store?.favorite?.favoriteProjects)
	useEffect(() => {
		setFavoriteProjects([])
		async function call() {
			await axios.post("/getfavorite",{id:favorites}).then((res) => {
				setFavoriteProjects(res?.data);
			});
		}
		call();
	}, [favorites]);

    const ProjectCardSecNew = ProjectCardSecRemove(ProjectCardSec)
	return (
		<div className="px-2 mt-16">
            <span className="font-medium">Projects (2)</span>

			<div className="mt-3 grid grid-col-5 grid-flow-row gap-2">
				{favoriteProjects.length === 0 && list?.map(item => <ProjectCardSecLoader key={item}/>)}
				{favoriteProjects && favoriteProjects?.map((item,index) => (
					<ProjectCardSecNew data={item}/>
				))}
			</div>
		</div>
	);
};

export default FavoriteSection
