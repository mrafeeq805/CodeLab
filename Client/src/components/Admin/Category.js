import React, { useEffect, useRef, useState } from "react";
import SideMenu from "./SideMenu";
import CategoryData from "./CategoryData";
import axios from "axios";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";

const Category = () => {
	const [categoryList, setCategoryList] = useState(null);
	const [categoryListPer, setCategoryListPer] = useState(null);
	const [showAdd, setShowAdd] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [id, setId] = useState(null);
	const [name, setName] = useState(null);
	const search = useRef(null);
	const filterHandler = (e) => {
		const type = e.target.value;
		if (type === "Listed" || type === "Unlisted") {
			const list = categoryListPer.filter((item) => item.status === type);
			setCategoryList(list);
		} else {
			const list = categoryList.filter((item) => true);
			setCategoryList(list);
		}
	};
	const searchHandler = (e) => {
		e.preventDefault();
		const list = categoryListPer.filter((item) =>
			item.title.toLowerCase().includes(search.current.value.toLowerCase())
		);
		setCategoryList(list);
	};
	const sortHandler = (e) => {
		const type = e.target.value;
		if (type === "Ascending : Projects") {
			const list = [...categoryListPer].sort(
				(a, b) => b.project_count - a.project_count
			);
			setCategoryList(list);
		} else if (type === "Descending : Projects") {
			const list = [...categoryListPer].sort(
				(a, b) => a.project_count - b.project_count
			);
			setCategoryList(list);
		} else if (type === "Ascending : Title") {
			const list = [...categoryListPer].sort(function (a, b) {
				if (a.title < b.title) {
					return -1;
				}
				if (a.title > b.title) {
					return 1;
				}
				return 0;
			});
			setCategoryList(list);
		} else if (type === "Descending : Title") {
			const list = [...categoryListPer].sort(function (a, b) {
				if (a.title < b.title) {
					return 1;
				}
				if (a.title > b.title) {
					return -1;
				}
				return 0;
			});
			setCategoryList(list);
		}
	};
	useEffect(() => {
		axios.get("/admin/getallcategories").then(({ data }) => {
			setCategoryListPer(data);
			setCategoryList(data);
			console.log(data);
		});
	}, []);
	return (
		<div className="flex">
			<SideMenu />
			{showAdd && (
				<AddCategory
					setShowAdd={setShowAdd}
					setCategoryList={setCategoryList}
				/>
			)}
			{showDelete && (
				<DeleteCategory
					id={id}
					name={name}
					setShowDelete={setShowDelete}
					setCategoryList={setCategoryList}
				/>
			)}
			<div className="w-full p-4">
				<div className="my-5">
					<span className="text-3xl font-semibold ">Categories</span>
					<span className="text-xs ml-6 text-[#00000080]">
						{" "}
						{categoryList?.length || 0} categories found
					</span>
				</div>
				<div className="flex gap-3 justify-end">
					<button
						onClick={() => setShowAdd(true)}
						className="border-2 rounded-md p-2 bg-primary text-white">
						{" "}
						Add Category
					</button>
					<div className="flex items-center ">
						<select
							className="border-2 rounded-md py-2 bg-inherit text-gray-500 px-8"
							onChange={sortHandler}>
							<option className="text-gray-500" value="Filter By">
								Sort By
							</option>
							{/* <option value="New">New</option>
							<option value="Old">Old</option> */}
							<option value="Ascending : Title">Ascending : Title</option>
							<option value="Descending : Title">Decending : Title</option>
							<option value="Ascending : Projects">Ascending : Projects</option>
							<option value="Descending : Projects">Decending : Projects</option>
						</select>
					</div>
					<div className="flex items-center ">
						<select
							onChange={filterHandler}
							className="border-2 rounded-md py-2 bg-inherit text-gray-500 px-8"
							name="product-filter"
							id="product-filter">
							<option className="text-gray-500" value="Filter By">
								Filter By
							</option>
							<option value="All">All</option>
							<option value="Listed">Listed</option>
							<option value="Unlisted">Unlisted</option>
						</select>
					</div>
					<div className="rounded-md bg-transparent border-gray-200 border-2 flex">
						<form className="flex" onSubmit={searchHandler}>
							<input
								ref={search}
								className="bg-transparent pl-4 outline-none w-80"
								type="text"
								placeholder="Search..."
							/>
							<button
								className="bg-primary flex justify-center items-center p-2 ">
								<span className="material-symbols-outlined text-white">
									search
								</span>
							</button>
						</form>
					</div>
				</div>

				<CategoryData
					categoryList={categoryList}
					setShowDelete={setShowDelete}
					setId={setId}
					setName={setName}
				/>
			</div>
		</div>
	);
};

export default Category;
