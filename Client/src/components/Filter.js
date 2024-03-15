import axios from "axios";
import React, { useEffect, useState } from "react";
import { categories } from "../utils/categories";

const Filter = ({projectList,setProjectList}) => {
    const [frameworks,setFrameworks] = useState(null)
    const filterHandler = (title) => {
        
    }
    useEffect(() => {
        async function call () {
			const {data} = await axios.get('/getallcategories')
			setFrameworks(data)
		}
		call()
    },[])
	return (
		<div className="w-full flex">
			<div className="w-56 border-r-[1px] h-screen">
				{/* <div className="flex w-full gap-4 py-3  mt-3 pr-2">
					<button
						className="border-2 p-2 flex justify-center items-center w-full">
						<span className="font-medium text-gray-500">CLEAR</span>
					</button>
					<input
						type="hidden"
					/>
					<button
						type="button"
						className="p-2 border-2 w-full font-medium flex justify-center items-center text-red-500">
						APPLY
					</button>
				</div> */}
				<div className="my-3">
					<div className="border-b-[1px] pb-4">
						<span className="text-lg font-medium">Frameworks</span>
						<div className="mt-1">
							<ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg dark:text-white">
								{frameworks?.map( item => (<li className="w-full  rounded-t-lg ">
									<div className="flex items-center ">
										<input
                                            onChange={() => filterHandler(item.title)}
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "
										/>
										<span className=" py-1  ms-2 text-sm font-medium text-gray-900 ">{item.title}</span>
										
									</div>
								</li>))}
							</ul>
						</div>
					</div>
                    <div className="border-b-[1px] pb-4 ">
						<span className="text-lg font-medium">Categories</span>
						<div className="mt-1 max-h-72 overflow-y-scroll">
							<ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg dark:text-white ">
								{categories?.map( item => (<li className="w-full  rounded-t-lg ">
									<div className="flex items-center ">
										<input
											type="checkbox"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "
										/>
										<span className=" py-1  ms-2 text-sm font-medium text-gray-900 ">{item}</span>
										
									</div>
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
