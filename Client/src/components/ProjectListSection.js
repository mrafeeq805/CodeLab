import React, { useEffect, useState } from "react";
import ProjectCardMain from "./ProjectCardMain";
import { useSelector } from "react-redux";
import ProjectCardMainLoader from "./skelton/ProjectCardMainLoader";
import axios from "axios";
import { useParams } from "react-router-dom";
import EmptyCard from "./EmptyCard";
import SortPopup from "./SortPopup";

const ProjectListSection = () => {
	const [projectList, setProjectList] = useState([]);
	const [emptyData, setEmptyData] = useState(false);
	const { category } = useParams();
	const [popup,setPopup] = useState(false)


	
	useEffect(() => {
		async function call() {
			await axios.get("/getrelated/" + category).then((res) => {
				if (res.data.length === 0) {
					setEmptyData(true);
				} else {
					setProjectList(res.data);
					setEmptyData(false);
				}
			});
		}
		call();
	}, []);
	//const projectList = useSelector((store) => store?.project?.latestProjects)
	const list = ["1", "2"];
	return (
		<div className="px-4 md:mt-24 md:px-16">
			<div className="flex gap-2">
				<span className="text-sm text-gray-400 md:text-base">Home</span>
				<span className="text-sm text-gray-400 md:text-base">/</span>
				<span className="text-sm text-gray-400 md:text-base">Projects</span>
				<span className="text-sm text-gray-400 md:text-base">/</span>
				<span className="text-sm text-gray-400 md:text-base">{category}</span>
			</div>
			{!emptyData && (
				<div className="flex justify-between items-center">
					<span className="font-medium">
						Projects ({projectList.length || 0})
					</span>
					<div onClick={() => setPopup(true)} className="flex items-center gap-2">
						<i class="bi bi-sort-down text-primary"></i>
						<span className="text-primary text-sm">SORT</span>
					</div>
				</div>
			)}
			{popup && <SortPopup setPopup={setPopup} setProjectList={setProjectList} list={projectList}/>}
			{emptyData && (
					<EmptyCard
						title={"Project Empty"}
						img={"/img/project_empty.png"}
						des={
							"Projects not found. Start adding projects to enhance your skills"
						}
					/>
				)}
			<div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
				
				{projectList.length === 0 &&
					!emptyData &&
					list?.map((item, index) => <ProjectCardMainLoader key={index} />)}
				{projectList &&
					projectList?.map((item, index) => (
						<ProjectCardMain key={index} data={item} />
					))}
			</div>
		</div>
	);
};

export default ProjectListSection;
