import React, { useEffect, useState } from "react";
import ProjectCardSec, { ProjectCardSecRemove } from "./ProjectCardSec";
import axios from "axios";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";
import { useSelector } from "react-redux";
import EmptyCard from "./EmptyCard";

const FavoriteSection = () => {
    const list = ['1','2']
	const [emptyData,setEmptyData] = useState(false)
	const [favoriteProjects,setFavoriteProjects] = useState([])
	const favorites = useSelector((store) => store?.favorite?.favoriteProjects)
	useEffect(() => {
		setFavoriteProjects([])
		async function call() {
			await axios.post("/getfavorite",{id:favorites})
			.then((res) => {
				if(res?.data.length === 0){
					setEmptyData(true)
				}else{
					setFavoriteProjects(res?.data)
					setEmptyData(false)
				}
				
			});
		}
		call();
	}, [favorites]);

    const ProjectCardSecNew = ProjectCardSecRemove(ProjectCardSec)
	return (
		<div className="px-2 mt-16">
            {!emptyData && <span className="font-medium">Projects ({favorites ? favorites.length : 0})</span>}
			{ emptyData &&  (<EmptyCard 
					title={"No favorites"} 
					img={"/img/no_favorite.png"} 
					des={"You have nothing on your list yet. Its never too late to change it"}
				/>)}
			<div className="mt-3 grid grid-col-5 grid-flow-row gap-2">
				{favoriteProjects.length === 0 && !emptyData && list?.map(item => <ProjectCardSecLoader key={item}/>)}
				{favoriteProjects && favoriteProjects?.map((item,index) => (
					<ProjectCardSecNew data={item}/>
				))}
			</div>
		</div>
	);
};

export default FavoriteSection
