import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import ProjectListSection from "./ProjectListSection";
import { Link } from "react-router-dom";

const ProjectList = () => {
	return (
		<div className="relative">
			<Navbar title={"Projects"} />
			<SearchBar title={"Search Projects..."} />
			<ProjectListSection />
			<Link to={"/addproject"}>
				<button className="bg-primary rounded-full h-16 w-16 p-2 text-white fixed z-30 right-2 bottom-2">
					<i class="bi bi-plus text-white text-3xl"></i>
				</button>
			</Link>
		</div>
	);
};

export default ProjectList;
