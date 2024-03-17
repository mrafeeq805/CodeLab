import axios from "axios";
import React, { useEffect, useState } from "react";
import { categories } from "../utils/categories";

const Filter = ({projectList,projectListPer,setProjectList}) => {
	const updatedFrameworks = Array.from(new Set (projectListPer?.map(item => item.frameworks_used).flat()))
	const updatedCategories = Array.from(new Set (projectListPer?.map(item => item.category).flat()))
	console.log(updatedFrameworks);
    const [frameworks,setFrameworks] = useState(null)
	let list = []
	let filteredlist = []
    const filterHandlerFramework = (value) => {
		const filtered = projectListPer.filter(item => item.frameworks_used.includes(value))
		setProjectList(filtered)

    }
	const filterHandlerCategory = (value) => {
		const filtered = projectListPer.filter(item => item.category === value)
		setProjectList(filtered)

    }

	return (
		<div className="w-full flex">
			<div className="w-56 border-r-[1px] h-screen">
				
				<div className="my-3">
					<div className="border-b-[1px] pb-4">
						<span className="text-lg font-medium">Frameworks</span>
						<div className="mt-1">
							<ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg dark:text-white">
								{updatedFrameworks?.map( item => (<li className="w-full odd:bg-gray-200">
									<button onClick={() => filterHandlerFramework(item)} className="flex items-center ">
										
										<span className=" py-1  ms-2 text-sm font-medium text-gray-900 ">{item}</span>
										
									</button>
								</li>))}
							</ul>
						</div>
					</div>
                    <div className="border-b-[1px] pb-4 ">
						<span className="text-lg font-medium">Categories</span>
						<div className="mt-1 max-h-48 overflow-y-scroll">
							<ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg dark:text-white ">
								{updatedCategories?.map( item => (<li className="w-full odd:bg-gray-200 ">
									<button onClick={() => filterHandlerCategory(item)} className="flex items-center ">
										
										<span className=" py-1  ms-2 text-sm font-medium text-gray-900 ">{item}</span>
										
									</button>
								</li>))}
							</ul>
						</div>
					</div>

					
					
				</div>
			</div>
		</div>
	);
};

export default Filter;
