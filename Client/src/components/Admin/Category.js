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
	const [id,setId] = useState(null)
	const [name,setName] = useState(null)
	const [searchType, setSearchType] = useState("Name");
	const search = useRef(null);
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
			{showAdd && <AddCategory setShowAdd={setShowAdd} setCategoryList={setCategoryList}/>}
			{showDelete && <DeleteCategory id={id} name={name} setShowDelete={setShowDelete} setCategoryList={setCategoryList}/>}
			<div className="w-full p-4">
				
				<div className="my-5">
					<span className="text-3xl font-semibold ">Categories</span>
					<span className="text-xs ml-6 text-[#00000080]"> categories found</span>
				</div>
				<div className="flex gap-3 justify-end">
					<button onClick={() => setShowAdd(true)} className="border-2 rounded-md p-2 bg-primary text-white"> Add Category</button>
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
							<option value="Active">Listed</option>
							<option value="Blocked">Unlisted</option>
						</select>
					</div>
					<div className="rounded-md bg-transparent border-gray-200 border-2 flex">
						
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
							<span className="material-symbols-outlined text-white">search</span>
						</button>
					</div>
				</div>

				<CategoryData categoryList={categoryList} setShowDelete={setShowDelete} setId={setId} setName={setName}/>
			</div>
		</div>
	);
};

export default Category;
