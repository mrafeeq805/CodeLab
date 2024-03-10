import React, { useEffect, useRef, useState } from "react";
import SideMenu from "./SideMenu";
import axios from "axios";
import ProjectData from "./ProjectData";
import ShowProjectDetails from "./ShowProjectDetails";
import DeleteProject from "./DeleteProject";


const Projects = () => {
	const [projectList, setProjectList] = useState(null);
	const [projectListPer, setProjectListPer] = useState(null);
    const [showData, setShowData] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [id,setId] = useState(null)
	const [searchType, setSearchType] = useState("Title");
    const search = useRef(null)

	const filterHandler = (e) => {
		
		const type = e.target.value;
		if (type === "Approved" || type === "Pending" || type === 'Rejected') {
			const list = projectListPer.filter((item) => item.status === type);
			setProjectList(list);
		}else{
			const list = projectListPer.filter((item) => true);
			setProjectList(list)
		}
	};
	const sortHandler = (e) => {
		const type = e.target.value;
		if (type === "New") {
			const list = [...projectListPer].sort(
				(a, b) => b.project_id - a.project_id
			);
			setProjectList(list);
		} else if (type === "Old") {
			const list = [...projectListPer].sort(
				(a, b) => a.project_id - b.project_id
			);
			setProjectList(list);
		} else if (type === "Ascending : Views") {
			const list = [...projectListPer].sort((a, b) => a.views - b.views);
			setProjectList(list);
		} else if (type === "Decending : Views") {
			const list = [...projectListPer].sort((a, b) => b.views - a.views);
			setProjectList(list);
		} else if (type === "Ascending : Name") {
			const list = [...projectListPer].sort(function (a, b) {
				if (a.publisher < b.publisher) {
					return -1;
				}
				if (a.publisher > b.publisher) {
					return 1;
				}
				return 0;
			});
			setProjectList(list);
		} else if (type === "Descending : Name") {
			const list = [...projectListPer].sort(function (a, b) {
				if (a.publisher < b.publisher) {
					return 1;
				}
				if (a.publisher > b.publisher) {
					return -1;
				}
				return 0;
			});
			setProjectList(list);
		}
	};
	const searchHandler = (e) => {
		e.preventDefault()
        if(searchType === 'Publisher'){
            const list = projectListPer.filter(item => item.publisher.toLowerCase().includes(search.current.value.toLowerCase()))
            setProjectList(list)
        }else{
            const list = projectListPer.filter(item => item.title.toLowerCase().includes(search.current.value.toLowerCase()))
            setProjectList(list)
        }
	};
	useEffect(() => {
		axios.get("/admin/getallprojects").then(({ data }) => {
			setProjectList(data);
			setProjectListPer(data);
		});
	}, []);
	return (
		<div className="flex">
			<SideMenu />
            {showData && <ShowProjectDetails setShowData={setShowData} id={id} setProjectList={setProjectList}/>}
            {showDelete && <DeleteProject projectList={projectList} setProjectList={setProjectList} setShowDelete={setShowDelete} id={id}/>}
			<div className="w-full p-4">
				<div className="my-4">
					<span className="text-3xl font-semibold ">Projects</span>
					<span className="text-xs ml-6 text-[#00000080]">{projectListPer?.length || 0} projects found</span>
				</div>
				<div className="flex gap-3 justify-end">
					<div className="flex items-center ">
						<select
							className="border-2 rounded-md py-2 bg-inherit text-gray-500 px-8"
							onChange={sortHandler}>
							<option className="text-gray-500" value="Sort By">
								Sort By
							</option>
							<option value="New">New</option>
							<option value="Old">Old</option>
							<option value="Ascending : Name">Ascending : Name</option>
							<option value="Descending : Name">Descending : Name</option>
							<option value="Ascending : Views">Ascending : Views</option>
							<option value="Decending : Views">Decending : Views</option>
						</select>
					</div>
					<div className="flex items-center ">
						<select
							onChange={filterHandler}
							className="border-2 rounded-md py-2 bg-inherit text-gray-500 px-8">
							<option className="text-gray-500" value="Filter By">
								Filter By
							</option>
							<option value="All">All</option>
							<option value="Approved">Approved</option>
							<option value="Pending">Pending</option>
							<option value="Rejected">Rejected</option>
						</select>
					</div>
					<div className="rounded-md bg-transparent border-gray-200 border-2 flex">
						<form className="flex" onSubmit={searchHandler}>
							<select onChange={(e) =>setSearchType(e.target.value)} className="pl-3 bg-inherit">
								<option value="Title">Title</option>
								<option value="Publisher">Publisher</option>
							</select>
							<input
								ref={search}
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
						</form>
					</div>
				</div>
				<ProjectData projectList={projectList} setShowData={setShowData} setId={setId} setShowDelete={setShowDelete} />
			</div>
		</div>
	);
};

export default Projects;
