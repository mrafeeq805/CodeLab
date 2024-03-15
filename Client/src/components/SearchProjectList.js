import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import ProjectListSection from "./ProjectListSection";
import { useParams } from "react-router-dom";
import ProjectCardMainLoader from "./skelton/ProjectCardMainLoader";
import { useDispatch, useSelector } from "react-redux";
import ProjectCardMain from "./ProjectCardMain";
import axios from "axios";
import { addSearchResult } from "../utils/projectSlice";
import EmptyCard from "./EmptyCard";
import Header from "./Header";
import Filter from "./Filter";
import Footer from "./Footer"

const SearchProjectList = () => {
	const [emptyData, setEmptyData] = useState(false);
	const dispatch = useDispatch();
	const list = [1, 2];
	const [projectList, setProjectList] = useState(null);
	const { search } = useParams();
	const sortHandler = (type) => {
		if (type === "Latest") {
			const newList = [...projectList].sort(
				(a, b) => b.project_id - a.project_id
			);
			setProjectList(newList);
		} else if (type === "Oldest") {
			const newList = [...projectList].sort(
				(a, b) => a.project_id - b.project_id
			);
			setProjectList(newList);
		} else if (type === "Popular") {
			const newList = [...projectList].sort((a, b) => b.views - a.views);
			setProjectList(newList);
		} else if (type === "Most Downloaded") {
			const newList = [...projectList].sort(
				(a, b) => b.downloads - a.downloads
			);
			setProjectList(newList);
		}
	};
	useEffect(() => {
		async function call() {
			await axios.get("/search/" + search.toLowerCase()).then((res) => {
				if (res?.data.length === 0) {
					setEmptyData(true);
				} else {
					setProjectList(res?.data);
					setEmptyData(false);
				}
			});
		}
		call();
	}, []);
	return (
		<div className="">
			<Navbar title={search} />
			<Header />
			<div className="md:hidden">
				<SearchBar title={"Search Projects..."} />
			</div>

			{emptyData && (
				<EmptyCard
					title={"No results found"}
					img={"/img/no_results.png"}
					des={"No results found. Please try again "}
				/>
			)}
			<div className="px-4 md:mt-24 md:px-24">
				<div className="flex gap-2">
					<span className="text-sm text-gray-400 md:text-base">Home</span>
					<span className="text-sm text-gray-400 md:text-base">/</span>
					<span className="text-sm text-gray-400 md:text-base">Search</span>
					<span className="text-sm text-gray-400 md:text-base">/</span>
					<span className="text-sm text-gray-400 md:text-base font-medium">
						{search}
					</span>
				</div>

				{!emptyData && (
					<div className="flex justify-between items-center md:my-5">
						<span className="font-medium md:text-lg">
							Search Results ({projectList ? projectList.length : 0})
						</span>
						<div className="flex items-center gap-2 md:hidden">
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
									className="font-medium ml-2">
									<option value="Latest">Latest</option>
									<option value="Oldest">Oldest</option>
									<option value="Popular">Popular</option>
									<option value="Most Downloaded">Most Downloaded</option>
								</select>
							</div>
						</div>
					</div>
				)}
				<div className="md:flex md:border-t-2">
					<div>
						<Filter projectList={projectList} setProjectList={setProjectList}/>
					</div>
					<div className="md:p-5">
						<div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
							{!projectList &&
								!emptyData &&
								list?.map((item, index) => (
									<ProjectCardMainLoader key={index} />
								))}
							{projectList &&
								projectList?.map((item, index) => (
									<ProjectCardMain key={index} data={item} />
								))}
						</div>
					</div>
				</div>
			</div>
			<div className="hidden md:block">
				<Footer/>
			</div>
		</div>
	);
};

export default SearchProjectList;
