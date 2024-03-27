import React, { useState } from "react";
import { Link } from "react-router-dom";
import { calcDate } from "../utils/dateDifference";
import { useDispatch } from "react-redux";
import { removeItem } from "../utils/favoriteSlice";
import { useNavigate } from "react-router-dom";


const ProjectCardSec = (props) => {
	const [load, setLoad] = useState(false);
	const onLoadImage = () => {
		console.log("loaded");
		setLoad(true);
	};
	const {
		project_id,
		title,
		thumbnail,
		publisher,
		category,
		views,
		downloads,
		published_date,
	} = props.data;
	return (
		<Link to={"/description/" + category + "/" + project_id}>
			<div className="border-[1px] border-gray-200 rounded-md p-2 flex md:flex-col md:shadow-lg">
				<div className="flex gap-3 sm:flex-col ">
					{!load && (
						<div class="flex items-center justify-center w-36 md:w-full lg:h-44 h-24 bg-gray-300 rounded sm:w-96 ">
							<svg
								class="w-10 h-10 text-gray-200 "
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 18">
								<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
							</svg>
						</div>
					)}
					<div className={load ? " w-36 md:w-full sm:w-96 h-24 lg:h-44" : 'hidden'}>
						<img
							className={
								load
									? "rounded-md h-full w-full object-cover "
									: " h-full w-full rounded-md object-cover"
							}
							src={thumbnail}
							alt="thumb"
							onLoad={onLoadImage}
						/>
					</div>
							

					<div className="flex flex-col">
						<span className="text-primary text-xs uppercase tracking-wider font-medium">
							{category}
						</span>
						<span className="lg:text-lg capitalize">{title}</span>
						<span className="text-sm text-gray-400 capitalize">{publisher}</span>
						<div className="flex justify-between w-full gap-8">
							<div className="flex gap-2 items-center">
								<i className="bi bi-eye-fill text-gray-400"></i>
								<span className="text-xs text-gray-400">{views}</span>
								<span className="text-xs text-gray-400 hidden md:inline">
									{" "}
									Views
								</span>
							</div>
							<div className="flex gap-2 items-center">
								<i className="bi bi-arrow-down-circle text-gray-400"></i>
								<span className="text-xs text-gray-400">{downloads}</span>
								<span className="text-xs text-gray-400 hidden ">
									{" "}
									Downloads
								</span>
							</div>
							<div className="flex gap-2 items-center">
								<i className="bi bi-clock text-gray-400"></i>
								<span className="text-xs text-gray-400">
									{calcDate(published_date).result || "New"}{" "}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export const ProjectCardSecRemove = (Card) => {
	const dispatch = useDispatch();
	return (props) => {
		const onClickHandler = (id) => {
			dispatch(removeItem(id));
		};
		return (
			<div className="relative">
				<button
					onClick={() => onClickHandler(props?.data?.project_id)}
					className="absolute top-0 right-0 flex items-center gap-2 p-1 bg-gray-100 px-2 rounded-bl-xl">
					<i class="bi bi-trash3-fill text-gray-400 text-xs"></i>
					<span className="text-xs text-gray-400">Remove</span>
				</button>
				<Card {...props} />
			</div>
		);
	};
};

export const ProjectCardSecMy = (Card) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (props) => {
		const onClickHandler = async (id) => {
			//code to remove item from myprojects
			navigate("/editproject/" + id);
		};
		return (
			<div className="relative">
				<button
					onClick={() => onClickHandler(props?.data?.project_id)}
					className="absolute top-0 right-0 flex items-center gap-2 p-1 bg-gray-100 px-2 rounded-bl-xl">
					<i class="bi bi-pen text-gray-400 text-xs"></i>
					<span className="text-xs text-gray-400">Modify</span>
				</button>
				<button
					className={
						props?.data?.status === "Pending"
							? "bg-primary absolute top-0 left-0 flex items-center gap-2 p-1 px-2 rounded-br-xl "
							: props?.data?.status === "Rejected"
							? "bg-red-500 absolute top-0 left-0 flex items-center gap-2 p-1 px-2 rounded-br-xl"
							: "bg-green-500 absolute top-0 left-0 flex items-center gap-2 p-1 px-2 rounded-br-xl"
					}>
					<span className="text-xs text-white">{props?.data?.status}</span>
				</button>
				<Card {...props} />
			</div>
		);
	};
};
export default ProjectCardSec;
