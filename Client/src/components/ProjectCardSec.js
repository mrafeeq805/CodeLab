import React, { useState } from "react";
import { Link } from "react-router-dom";
import { calcDate } from "../utils/dateDifference";
import { Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeItem } from "../utils/favoriteSlice";

const ProjectCardSec = (props) => {
	const [load,setLoad] = useState(false)
	const onLoadImage = () => {
		console.log("loaded");
		setLoad(true)
	}
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
		<Link to={"/description/"+category+"/"+project_id}>
			<div className="border-[1px] border-gray-200 rounded-md p-2 flex">
				<div className="flex gap-3">
					{!load && <Skeleton variant="rounded" width={150} height={90} />}
					<img
						className={load ? "rounded-md w-2/5 h-26 object-cover" : "hidden rounded-md w-2/5 h-26 object-cover" }
						src={thumbnail}
						alt="thumb"
						onLoad={onLoadImage}
					/>

					<div className="flex flex-col">
						<span className="text-primary text-xs uppercase tracking-wider font-medium">
							{category}
						</span>
						<span className="">{title}</span>
						<span className="text-sm text-gray-400">{publisher}</span>
						<div className="flex justify-between w-full gap-8">
							<div className="flex gap-2 items-center">
								<i className="bi bi-eye-fill text-gray-400"></i>
								<span className="text-xs text-gray-400">{views}</span>
							</div>
							<div className="flex gap-2 items-center">
								<i className="bi bi-arrow-down-circle text-gray-400"></i>
								<span className="text-xs text-gray-400">{downloads}</span>
							</div>
							<div className="flex gap-2 items-center">
								<i className="bi bi-clock text-gray-400"></i>
								<span className="text-xs text-gray-400">{ calcDate(published_date).result || "New"} </span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export const ProjectCardSecRemove = (Card) => {
	const dispatch = useDispatch()
	return (props) => {
		const onClickHandler = (id) => {
			dispatch(removeItem(id))
		}
		return (
			<div className="relative">
				<button onClick={() => onClickHandler(props?.data?.project_id)} className="absolute top-0 right-0 flex items-center gap-2 p-1 bg-gray-100 px-2 rounded-bl-xl">
					<i class="bi bi-trash3-fill text-gray-400 text-xs"></i>
					<span className="text-xs text-gray-400">Remove</span>
				</button>
				<Card {...props} />
			</div>
		);
	};
};

export default ProjectCardSec;
