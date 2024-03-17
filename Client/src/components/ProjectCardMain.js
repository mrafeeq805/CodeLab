import React, { useState } from "react";
import DomainChip from "./DomainChip";
import { Link } from "react-router-dom";
import { calcDate } from "../utils/dateDifference";
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/favoriteSlice";

const ProjectCardMain = ({ data,type }) => {
	const [load,setLoad] = useState(false)
	const onImagLoad = () => {
		setLoad(true)
	}
	const dispatch = useDispatch();
	const favoriteHandler = () => {
		const id = data?.project_id
		if (!favorites.includes(id)) {
			dispatch(addItem(id));
		}else{
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
		project_id
	} = data;
	return (
		<Link  to={type  === 'related' ? "/description/"+category + "/" + project_id + '/type=related' : "/description/" + category + "/" + project_id}>
			<div className="border-[1px] border-gray-200 rounded-md flex w-full">
				<div className="w-full relative">
					{!load && <Skeleton variant="rounded" width={350} height={170} />}
					<img
						className={load ? "rounded-md h-44 w-full object-cover" : "hidden rounded-md h-44 w-full object-cover"}
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
						<span className="text-lg">{title}</span>
						<span className=" text-gray-400">{publisher}</span>
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
								<span className="text-sm text-gray-400">{calcDate(published_date).result || "New" }</span>
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
