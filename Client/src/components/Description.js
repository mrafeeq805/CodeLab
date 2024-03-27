import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProjectDetails from "./ProjectDetails";
import InfoCard from "./InfoCard";
import DeveloperProfileCard from "./DeveloperProfileCard";
import RelatedProjects from "./RelatedProjects";
import DownloadCard from "./DownloadCard";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import ScreenshotsCarousel from "./ScreenshotsCarousel";
import { calcDate } from "../utils/dateDifference";
import Header from "./Header";
import Footer from "./Footer";
import _ from "lodash";
import { Bounce, ToastContainer, toast } from "react-toastify";

const Description = () => {
	const [description, setDiscription] = useState(null);
	const [publisher, setPublisher] = useState(null);
	const location = useLocation();
	const { project_id, category } = useParams();
	const [ssvisible, setSSVisible] = useState(false);
	const [load,setLoad] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0);
		async function call() {
			await axios
				.get("/api/description/" + project_id)
				.then(async (res) => {
					setDiscription(res?.data?.details);
					setPublisher(res?.data?.publisher);
				})
				.catch((err) => {
					toast.warn("Something went wrong !", {
						position: "top-center",
						autoClose: 2000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Bounce,
					});
				});
		}
		call();
	}, [location.pathname]);

	return (
		<div className="bg-slate-50 ">
			<Navbar title={"Project Desciption"} />
			<Header />
			<ToastContainer />
			{description && (
				<div className="hidden md:flex md:flex-col md:gap-3 pt-6 px-32 md:mt-20">
					<div className="flex gap-2">
						<Link to={"/"} className="text-sm text-gray-400 md:text-base">
							Home
						</Link>
						<span className="text-sm text-gray-400 md:text-base">/</span>
						<span className="text-sm text-gray-400 md:text-base">Projects</span>
						<span className="text-sm text-gray-400 md:text-base">/</span>
						<span className="text-sm text-gray-400 md:text-base">
							{category}
						</span>
					</div>
					<span className="md:text-3xl text-xl md:font-medium capitalize">
						{description?.title}
					</span>
					<div className="flex justify-between md:justify-normal md:gap-10 mt-1 w-full">
						<div className="flex gap-2">
							<span className="  md:text-lg font-medium">By</span>
							<span className=" text-primary md:text-lg capitalize">
								{description?.publisher}
							</span>
						</div>
						<div className="flex gap-1 items-center">
							<i className="bi bi-eye-fill text-gray-400"></i>
							<span className="text-sm text-gray-400 md:text-base">
								{description?.views} views
							</span>
						</div>

						<div className="flex gap-1 items-center">
							<i className="bi bi-clock text-gray-400"></i>
							<span className="text-sm text-gray-400 md:text-base">
								{calcDate(description?.published_date).result + " ago" || "New"}
							</span>
						</div>
					</div>
				</div>
			)}
			{/* skelton */}
			{!description && (
				<div className="hidden md:flex md:flex-col animate-pulse md:px-32 gap-4 md:mt-20 pt-10">
					<div class="h-5 bg-gray-200 rounded-full w-9/12 "></div>
					<div className="flex justify-between md:justify-normal md:gap-10 mt-1 w-full">
						<div className="flex gap-2">
							<div class="h-2.5 bg-gray-200 rounded-full w-20 "></div>
						</div>
						<div className="flex gap-1 items-center">
							<div class="h-2.5 bg-gray-200 rounded-full w-20 "></div>
						</div>

						<div className="flex gap-1 items-center">
							<div class="h-2.5 bg-gray-200 rounded-full w-20 "></div>
						</div>
					</div>
				</div>
			)}
			<hr className="my-3 hidden md:block" />
			<div className="md:flex md:px-28 ">
				<div className="px-3 md:w-8/12">
					<div>
						<ProjectDetails details={description} setSSVisible={setSSVisible} />
						{ssvisible && (
							<ScreenshotsCarousel
								screenshots={description?.screenshots}
								setSSVisible={setSSVisible}
							/>
						)}
					</div>
					<div className="bg-white p-4 hidden md:block">
						<span className="text-lg font-medium">Screenshots</span>
						<div className=" gap-4 md:grid grid-cols-4 my-3">
							{description?.screenshots.map((item) => (
								<div onClick={() => setSSVisible(true)}>
									<img className={load ? "h-32 object-cover border-2 p-2 rounded-lg" : "hidden"} src={item} alt="thumb" onLoad={() => setLoad(true)} />
									{!load && (<div class="flex items-center justify-center w-36 md:w-full h-32 bg-gray-300 rounded sm:w-96 ">
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
								</div>
							))}
						</div>
						{!description && (
							<div className=" gap-4 md:grid grid-cols-4 my-3 animate-pulse">
								{_.range(0, 4).map((item) => (
									<div class="flex items-center justify-center w-36 md:w-full h-32 bg-gray-300 rounded sm:w-96 ">
										<svg
											class="w-10 h-10 text-gray-200 "
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 20 18">
											<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
										</svg>
									</div>
								))}
							</div>
						)}
					</div>

					<div className="bg-white p-3 my-3">
						<span className="font-medium text-lg">Overview</span>
						<hr className="my-2"></hr>
						{!description && (
							<div className="flex flex-col gap-3 animate-pulse my-2">
								<div class="h-2.5 bg-gray-200 rounded-full w-11/12 "></div>
								<div class="h-2.5 bg-gray-200 rounded-full w-10/12 "></div>
							</div>
						)}

						{description && <p className="capitalize">{description?.overview}</p>}
					</div>
					<div className="bg-white p-3 my-3">
						<span className="font-medium text-lg">Features</span>
						<hr className="my-2"></hr>
						{!description && (
							<div className="flex flex-col gap-3 animate-pulse my-2">
								<div class="h-2.5 bg-gray-200 rounded-full w-11/12 "></div>
								<div class="h-2.5 bg-gray-200 rounded-full w-10/12 "></div>
							</div>
						)}

						{description && (
							<div
								dangerouslySetInnerHTML={{
									__html: description?.features,
								}}></div>
						)}
					</div>
				</div>
				<div className="md:w-4/12 md:mt-4">
					<div className="bg-white p-4 hidden md:block">
						<div>
							<div className="flex gap-4">
								<i class="bi bi-check-circle-fill text-green-500 text-xl"></i>
								<span className="text-lg text-gray-600">Free Support</span>
							</div>
							<div className="flex gap-4">
								<i class="bi bi-check-circle-fill text-green-500 text-xl"></i>
								<span className="text-lg text-gray-600">
									Future product updates
								</span>
							</div>
							<div className="flex gap-4">
								<i class="bi bi-check-circle-fill text-green-500 text-xl"></i>
								<span className="text-lg text-gray-500">
									Quality checked by Codester
								</span>
							</div>
						</div>
						<a
							onClick={"onDownload"}
							className="w-full"
							href={"https://drive.google.com/uc?export=download&id="}
							target="_blank"
							rel="noreferrer">
							<button className="bg-primary p-3 px-8 mt-3 w-full rounded-lg flex items-center gap-3 justify-center">
								<i className="bi bi-arrow-down-circle text-white"></i>
								<span className="text-white">Download Files</span>
							</button>
						</a>
					</div>
					<InfoCard data={description} />
					<DeveloperProfileCard publisher={publisher} />
				</div>
			</div>

			{/* <RelatedProjects /> */}
			<RelatedProjects />
			{!ssvisible && (
				<DownloadCard
					id={description?.project_id}
					url={description?.project_link}
				/>
			)}
			<div className="hidden md:block">
				<Footer />
			</div>
		</div>
	);
};

export default Description;
