import React, { useEffect } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import ProjectListSection from "./ProjectListSection";
import { useParams } from "react-router-dom";
import ProjectCardMainLoader from "./skelton/ProjectCardMainLoader";
import { useDispatch, useSelector } from "react-redux";
import ProjectCardMain from "./ProjectCardMain";
import axios from "axios";
import { addSearchResult } from "../utils/projectSlice";

const SearchProjectList = () => {
	const dispatch = useDispatch();
	const list = [1, 2];
	const projectList = useSelector((store) => store?.project?.searchResults);
	const { search } = useParams();
	useEffect(() => {
		async function call() {
			await axios
				.get("/search/" + search.toLowerCase())
				.then((res) => {
					dispatch(addSearchResult(res?.data));
				});
		}
    call()
	}, []);
	return (
		<div>
			<Navbar title={search} />
			<SearchBar title={"Search Projects..."} />
			<div className="px-4">
				<div className="flex justify-between items-center">
					<span className="font-medium">
						Search Results ({projectList ? projectList.length : 0})
					</span>
					<div className="flex items-center gap-2">
						<i class="bi bi-sort-down text-primary"></i>
						<span className="text-primary text-sm">SORT</span>
					</div>
				</div>

				<div className="mt-3 grid grid-cols-1 gap-3">
					{!projectList &&
						list?.map((item, index) => <ProjectCardMainLoader key={index} />)}
					{projectList &&
						projectList?.map((item, index) => (
							<ProjectCardMain key={index} data={item} />
						))}
				</div>
			</div>
		</div>
	);
};

export default SearchProjectList;
