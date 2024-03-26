import React, { useRef } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const Banner = () => {
	const search = useRef(null);
	const navigate = useNavigate()
	const formHandler = (e) => {
		e.preventDefault()
		navigate('/search/'+search.current.value.toLowerCase())
	};
	return (
		<div className="px-48 md:flex hidden flex-col justify-center items-center bg-gradient-to-r from-primary to-blue-400 py-16 mt-16">
			<div className="">
				<p className="text-white text-4xl text-center ">
					Are you struggling to find a <strong>unified platform </strong>to showcase your projects,
					We offers a <strong>centralized </strong>space for <strong>developers</strong> to upload and share their work.
				</p>
				<div className="flex justify-center items-center mt-7">
					<div className="p-2 my-2 md:w-8/12 ">
						<div className="rounded-lg border-2 p-2 px-4 bg-white">
							<form
								className="flex justify-between bg-white"
								onSubmit={formHandler}>
								<input
									ref={search}
									type="text"
									className="w-full outline-none"
									placeholder={"Seacrh Projects on all domains ...."}
								/>
								<button className="bi bi-search text-gray-500"></button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
