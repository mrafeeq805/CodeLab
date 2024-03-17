import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addSearchResult } from "../utils/projectSlice";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = ({ title }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {search} = useParams()
	const searchKey = useRef(null)
	const formHandler = async (e) => {
		e.preventDefault()
		navigate('/search/'+searchKey.current.value.toLowerCase())
		

	}

	return (
		<div className="p-2 my-2 md:w-6/12">
			<div className="rounded-lg border-2 p-2 px-4 ">
				<form className="flex justify-between" onSubmit={formHandler}>
					<input
						ref={searchKey}
						type="text"
						className="w-full outline-none"
						placeholder={title}
					/>
					<button className="bi bi-search text-gray-500"></button>
				</form>
			</div>
		</div>
	);
};

export default SearchBar;
