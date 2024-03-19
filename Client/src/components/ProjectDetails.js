import React, { useState } from "react";
import { calcDate } from "../utils/dateDifference";
import ProjectDetailsLoader from "./skelton/ProjectDetailsLoader";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { addItem, removeItem } from "../utils/favoriteSlice";

const ProjectDetails = ({ details, setSSVisible }) => {
	const favorites = useSelector((store) => store?.favorite?.favoriteProjects);
	const dispatch = useDispatch();
	const [load, setLoad] = useState(false);
	const onLoadImage = () => {
		setLoad(true)
	}
	const favoriteHandler = (id) => {
		if (!favorites.includes(id)) {
			toast.success("Added to favorite projects", {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Bounce,
			});
			dispatch(addItem(id));
		} else {
			toast.info("removed from	favorite projects", {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Bounce,
			});
			dispatch(removeItem(id));
		}
	};
	return (
		<div className="mt-4 md:mt-4 px-2 bg-white my-5">
			{!details && <ProjectDetailsLoader />}
			{details && (
				<div className="flex flex-col p-3 w-full">
					<div className="flex justify-between md:hidden">
						<span className="md:text-2xl text-xl md:font-medium">
							{details?.title}
						</span>
						<div className="px-4 h-max bg-green-100 rounded-xs md:hidden flex justify-center items-center">
							<span className="text-green-500">{details?.price}</span>
						</div>
					</div>

					<div className="flex md:hidden justify-between md:justify-normal md:gap-10 mt-1 w-full">
						<div className="">
							<span className=" text-gray-400 md:text-lg">
								{details?.publisher}
							</span>
						</div>

						<div className="flex gap-1 items-center">
							<i className="bi bi-clock text-gray-400"></i>
							<span className="text-sm text-gray-400 md:text-base">
								{calcDate(details?.published_date).result + " ago" || "New"}
							</span>
						</div>
					</div>
					<div className="mt-4">
						<ToastContainer />
						<div className="rounded-md h-44 md:h-96 relative group">
							<img
								className={load ? "rounded-md h-full w-full object-cover " : "invisible"}
								src={details?.thumbnail}
								alt="thumbnail"
								onLoad={onLoadImage}
							/>
							{!load && (<div class="h-40 md:h-80 bg-gray-200 rounded-lg w-full flex justify-center items-center">
								<svg
									class="w-10 h-10 fill-gray-600 "
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 18">
									<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
								</svg>
							</div>)}
							<div className="opacity-0 absolute w-full top-0 rounded-md h-44 md:h-96 bg-black bg-opacity-50 flex transition-all group-hover:delay-100 group-hover:opacity-80  justify-center items-center">
								<div className="flex gap-5">
									<a href={details?.live_link} target="_blank" rel="noreferrer">
										<button className="border-white border-2 rounded-full p-3 h-16 w-16 hover:scale-110 transition-all hover:delay-100">
											<i class="bi bi-laptop text-white text-2xl"></i>
										</button>
									</a>
									<button
										onClick={() => favoriteHandler(details?.project_id)}
										className="border-white border-2 rounded-full p-3 h-16 w-16 hover:scale-110 transition-all hover:delay-100 group/heart">
										<i class="bi bi-heart text-white text-2xl"></i>
									</button>
								</div>
							</div>
						</div>

						<div className="flex mt-3 gap-5 md:hidden">
							<a
								className="w-full"
								href={details?.live_link}
								target="_blank"
								rel="noreferrer">
								<button className="bg-primary p-2 w-full rounded-md flex items-center gap-3 justify-center">
									<i className="bi bi-laptop text-white"></i>
									<span className="text-white">Live Demo</span>
								</button>
							</a>

							<button
								onClick={() => setSSVisible(true)}
								className="bg-gray-400 p-2 w-full rounded-md flex items-center gap-3 justify-center">
								<i className="bi bi-card-image text-white"></i>
								<span className="text-white">Screenshots</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProjectDetails;
