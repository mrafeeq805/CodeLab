import React, { useEffect } from "react";
import ProjectCardSec, { ProjectCardSecMy } from "./ProjectCardSec";
import { useDispatch, useSelector } from "react-redux";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";
import axios from "axios";
import { addMyProjects } from "../utils/projectSlice";
import { useNavigate } from "react-router-dom";

const MyProjecSection = ({ data }) => {
	const ProjectCardSecNew = ProjectCardSecMy(ProjectCardSec);
	const count = [1, 2];
	const myProjects = useSelector((store) => store?.project.myProjects);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		async function call() {
			await axios
				.get("/getMyProjects")
				.then(({ data }) => {
					if (data?.status) {
						dispatch(addMyProjects(data?.data));
					} else {
						navigate("/login");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		call();
	}, []);
	return (
		<div className="px-2 mt-16">
			<span className="font-medium">Projects ({myProjects.length || 0})</span>

			<div className="mt-3 grid grid-col-5 grid-flow-row gap-2">
				{myProjects.length === 0 && count?.map((item) => <ProjectCardSecLoader key={item} />)}
				{
					myProjects?.map((item, index) => (
						<ProjectCardSecNew key={index} data={item} />
					))}
			</div>
		</div>
	);
};

export default MyProjecSection;
