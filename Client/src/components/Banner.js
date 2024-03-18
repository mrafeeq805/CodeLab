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
		<div className="px-96 md:flex hidden flex-col justify-center items-center bg-gradient-to-r from-primary to-blue-400 py-16 mt-16">
			<div className="">
				<p className="text-white text-3xl text-center">
					Buy premium <strong>PHP scripts, app templates, themes</strong> and{" "}
					<strong>plugins</strong> and create amazing websites & apps.
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
