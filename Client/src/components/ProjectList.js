import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import ProjectListSection from "./ProjectListSection";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer'

const ProjectList = () => {
	const {category} = useParams()
	return (
		<div className="relative">
			<Navbar title={category} />
			<Header/>
			<div className="block md:hidden">
				<SearchBar title={"Search Projects..."} />
			</div>
			
			<ProjectListSection />
			<Link to={"/addproject"}>
				<button className="bg-primary md:hidden rounded-full h-16 w-16 p-2 text-white fixed z-30 right-2 bottom-2">
					<i class="bi bi-plus text-white text-3xl"></i>
				</button>
			</Link>
			<div className="hidden md:block mt-12">
				<Footer/>
			</div>
		</div>
	);
};

export default ProjectList;
