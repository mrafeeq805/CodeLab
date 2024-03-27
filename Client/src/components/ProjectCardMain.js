import React, { useState } from "react";
import DomainChip from "./DomainChip";
import { Link } from "react-router-dom";
import { calcDate } from "../utils/dateDifference";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/favoriteSlice";

const ProjectCardMain = ({ data, type }) => {
	const [load, setLoad] = useState(false);
	const onImagLoad = () => {
		setLoad(true);
	};
	const dispatch = useDispatch();
	const favoriteHandler = () => {
		const id = data?.project_id;
		if (!favorites.includes(id)) {
			dispatch(addItem(id));
		} else {
			dispatch(removeItem(id));
		}
	};
	const favorites = useSelector((store) => store?.favorite?.favoriteProjects);
	const list = ["React JS", "Node JS"];
	const {
		title,
		publisher,
		views,
		downloads,
		price,
		frameworks_used,
		thumbnail,
		published_date,
		category,
		project_id,
	} = data;
	return (
		<Link to={"/description/" + category + "/" + project_id}>
			<div className="border-[1px] border-gray-200 rounded-md flex w-full">
				<div className="w-full relative">
					{!load && (
						<div class="flex items-center justify-center w-full h-44 bg-gray-300 rounded  ">
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
					<img
						className={
							load
								? "rounded-md h-44 w-full object-cover"
								: "hidden rounded-md h-44 w-full object-cover"
						}
						src={thumbnail}
						alt=""
						onLoad={onImagLoad}
					/>
					<div className="flex absolute top-2 left-2 gap-2">
						{frameworks_used?.map((item) => (
							<DomainChip key={item} title={item} />
						))}
					</div>
					<div className="flex flex-col p-2">
						<span className="text-lg capitalize">{title}</span>
						<span className=" text-gray-400 capitalize">{publisher}</span>
						<div className="flex justify-between mt-1">
							<div className="flex gap-2 items-center">
								<i className="bi bi-eye-fill text-gray-400"></i>
								<span className="text-sm text-gray-400">{views}</span>
							</div>
							<div className="flex gap-2 items-center">
								<i className="bi bi-arrow-down-circle text-gray-400"></i>
								<span className="text-sm text-gray-400">{downloads}</span>
							</div>
							<div className="flex gap-2 items-center">
								<i className="bi bi-clock text-gray-400"></i>
								<span className="text-sm text-gray-400">
									{calcDate(published_date).result || "New"}
								</span>
							</div>
							<div className="px-6 bg-light rounded-xs flex justify-center items-center">
								<span className="text-primary">{price}</span>
							</div>
						</div>
					</div>
				</div>
				{/* <button onClick={favoriteHandler} className="absolute flex justify-center items-center top-2 right-2 rounded-full h-10 w-10 bg-gray-500 p-2 bg-opacity-40">
					<i className="bi bi-heart text-white"></i>
				</button> */}
			</div>
		</Link>
	);
};

export default ProjectCardMain;
