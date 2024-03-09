import React from "react";
import SideMenu from "./SideMenu";

const Category = () => {
    const list = [
        "#","ID","Name","Domain","Projects","Status","Action"
    ]
	return (
		<div className="flex">
            <SideMenu />
			<div className="w-full p-4">
				
				<div className="">
					<span className="text-3xl font-semibold ">Categories</span>
					<span className="text-xs ml-6 text-[#00000080]"> categories found</span>
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

				<table className="w-full border-separate border-spacing-y-3">
					<tr className="text-left border-b-2 ">
                        {list.map(item=>(
						<th className="text-[#00000070] border-b-[1px] border-slate-300 mr-2">
							<span className="">{item}</span>
						</th>))}
						
					</tr>
				</table>
			</div>
		</div>
	);
};

export default Category;
