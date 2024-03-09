import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import axios from "axios";
import ProjectData from "./ProjectData";

const Projects = () => {
	
	const [projectList, setProjectList] = useState(null);
	useEffect(() => {
		axios.get("/admin/getallprojects").then(({ data }) => {
			setProjectList(data);
			console.log(data);
		});
	}, []);
	return (
		<div className="flex">
			<SideMenu />
			<div className="w-full p-4">
				<div className="">
					<span className="text-3xl font-semibold ">Projects</span>
					<span className="text-xs ml-6 text-[#00000080]"> projects found</span>
				</div>
				<div className="flex gap-3 justify-end">
					<div className="flex items-center ">
						<select
							onchange="filterCustomer(this)"
							className="border-2 rounded-md py-2 bg-inherit text-gray-500 px-8"
							name="product-filter"
							id="product-filter">
							<option className="text-gray-500" value="Filter By">
								Sort By
							</option>
							<option value="New">New</option>
							<option value="Old">Old</option>
							<option value="Ascending : Name">Ascending : Name</option>
							<option value="Decending : Name">Decending : Name</option>
							<option value="Ascending : Email">Ascending : Email</option>
							<option value="Decending : Email">Decending : Email</option>
							<option value="Ascending : Project Count">
								Ascending : Project Count
							</option>
							<option value="Decending : Project Count">
								Decending : Project Count
							</option>
						</select>
					</div>
					<div className="flex items-center ">
						<select
							onchange="filterCustomer(this)"
							className="border-2 rounded-md py-2 bg-inherit text-gray-500 px-8"
							name="product-filter"
							id="product-filter">
							<option className="text-gray-500" value="Filter By">
								Filter By
							</option>
							<option value="All">All</option>
							<option value="Active">Approved</option>
							<option value="Blocked">Pending</option>
						</select>
					</div>
					<div className="rounded-md bg-transparent border-gray-200 border-2 flex">
						<select
							id="customer_search_type"
							className="pl-3 bg-inherit"
							name="customer_search_type">
							<option value="name">Name</option>
							<option value="email">Project ID</option>
							<option value="Title">Title</option>
							<option value="Publisher">Publisher</option>
						</select>
						<input
							id="customer_search"
							name="customer_search"
							className="bg-transparent pl-4 outline-none w-80"
							type="text"
							placeholder="Search..."
						/>
						<button
							onclick="searchCustomer()"
							className="bg-primary flex justify-center items-center p-2 ">
							<span className="material-symbols-outlined text-white">
								search
							</span>
						</button>
					</div>
				</div>
                <ProjectData projectList={projectList}/>

				
			</div>
		</div>
	);
};

export default Projects;
