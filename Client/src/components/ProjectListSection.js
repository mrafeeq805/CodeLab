import React, { useEffect, useState } from "react";
import ProjectCardMain from "./ProjectCardMain";
import ProjectCardMainLoader from "./skelton/ProjectCardMainLoader";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import EmptyCard from "./EmptyCard";
import SortPopup from "./SortPopup";
import _ from 'lodash'

const ProjectListSection = () => {
	const [projectList, setProjectList] = useState([]);
	const [emptyData, setEmptyData] = useState(false);
	const { category } = useParams();
	const [popup, setPopup] = useState(false);
	const sortHandler = (type) => {
        if(type === "Latest"){
            const newList = [...projectList].sort((a, b) => b.project_id - a.project_id)
            setProjectList(newList)

        }else if(type === "Oldest"){
            const newList = [...projectList].sort((a, b) => a.project_id - b.project_id)
            setProjectList(newList)
        }
        else if(type === "Popular"){
            const newList = [...projectList].sort((a, b) => b.views - a.views)
            setProjectList(newList)
        }
        else if(type === "Most Downloaded"){
            const newList = [...projectList].sort((a, b) => b.downloads - a.downloads)
            setProjectList(newList)
        }
        
    }

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

	return (
		<div className="px-4 md:mt-24 md:px-16">
			<div className="hidden md:flex gap-2">
				<Link to={'/'} className="text-sm text-gray-400 md:text-base">Home</Link>
				<span className="text-sm text-gray-400 md:text-base">/</span>
				<span className="text-sm text-gray-400 md:text-base">Projects</span>
				<span className="text-sm text-gray-400 md:text-base">/</span>
				<span className="text-sm text-gray-400 md:text-base font-medium">{category}</span>
			</div>
			{!emptyData && (
				<div className="flex justify-between items-center md:my-5">
					<span className="font-medium">
						Projects ({projectList.length || 0})
					</span>
					<div
						onClick={() => setPopup(true)}
						className="flex items-center gap-2 md:hidden">
						<i class="bi bi-sort-down text-primary"></i>
						<span className="text-primary text-sm">SORT</span>
					</div>
					<div className="hidden md:flex">
						<div class="border-2 flex rounded-md p-3 items-center justify-between">
							<div>
								<span>Sort By : </span>
							</div>
							<select
								onChange={(e) => sortHandler(e.target.value)}
								className="font-medium ml-2"
								>
								<option value="Latest">Latest</option>
								<option value="Oldest">Oldest</option>
								<option value="Popular">Popular</option>
								<option value="Most Downloaded">Most Downloaded</option>

							</select>
						</div>
					</div>
				</div>
			)}
			{popup && (
				<SortPopup
					setPopup={setPopup}
					setProjectList={setProjectList}
					list={projectList}
				/>
			)}
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
					_.range(1,5).map((item, index) => <ProjectCardMainLoader key={index} />)}
				{projectList &&
					projectList?.map((item, index) => (
						<ProjectCardMain key={index} data={item} />
					))}
			</div>
		</div>
	);
};

export default ProjectListSection;
