import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProjectDetails from "./ProjectDetails";
import InfoCard from "./InfoCard";
import DeveloperProfileCard from "./DeveloperProfileCard";
import RelatedProjects from "./RelatedProjects";
import DownloadCard from "./DownloadCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@mui/material";
import ScreenshotsCarousel from "./ScreenshotsCarousel";
import { calcDate } from "../utils/dateDifference";
import Header from "./Header";
import Footer from "./Footer";

const Description = () => {
	const [description, setDiscription] = useState(null);
	const [publisher, setPublisher] = useState(null);
	const { project_id,category } = useParams();
	const [ssvisible, setSSVisible] = useState(false);
	useEffect(() => {
		async function call() {
			await axios
				.get("/description/" + project_id)
				.then(async (res) => {
					setDiscription(res?.data?.details);
					setPublisher(res?.data?.publisher);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		call();
	}, [project_id]);

	return (
		<div className="bg-slate-50 ">
			<Navbar title={"Project Desciption"} />
			<Header/>
			<div className="hidden md:flex md:flex-col md:gap-3 pt-6 px-32 md:mt-20">
				<div className="flex gap-2">
					<span className="text-sm text-gray-400 md:text-base">Home</span>
					<span className="text-sm text-gray-400 md:text-base">/</span>
					<span className="text-sm text-gray-400 md:text-base">Projects</span>
					<span className="text-sm text-gray-400 md:text-base">/</span>
					<span className="text-sm text-gray-400 md:text-base">{category}</span>
				</div>
				<span className="md:text-3xl text-xl md:font-medium">
					{description?.title}
				</span>
				<div className="flex justify-between md:justify-normal md:gap-10 mt-1 w-full">
					<div className="flex gap-2">
						<span className="  md:text-lg font-medium">By</span>
						<span className=" text-primary md:text-lg">{description?.publisher}</span>
					</div>
					<div className="flex gap-1 items-center">
						<i className="bi bi-eye-fill text-gray-400"></i>
						<span className="text-sm text-gray-400 md:text-base">{description?.views} views</span>
					</div>

					<div className="flex gap-1 items-center">
						<i className="bi bi-clock text-gray-400"></i>
						<span className="text-sm text-gray-400 md:text-base">{calcDate(description?.published_date).result+" ago" || "New"}</span>
					</div>
				</div>
			</div>
			<hr className="my-3"/>
			<div className="md:flex md:px-28 ">
				<div className="px-3 mb-32 md:w-8/12">
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
								<img src={item} alt="thumb" />
							))}
						</div>
					</div>

					<div className="bg-white p-3 my-3">
						<span className="font-medium text-lg">Overview</span>
						<hr className="my-2"></hr>
						{!description && (
							<div className="flex flex-col gap-2">
								<Skeleton
									variant="rounded"
									width={300}
									height={5}
									sx={{ fontSize: "0.8rem" }}
								/>
								<Skeleton
									variant="rounded"
									width={250}
									height={5}
									sx={{ fontSize: "0.8rem" }}
								/>
							</div>
						)}

						{description && <p>{description?.overview}</p>}
					</div>
					<div className="bg-white p-3 my-3">
						<span className="font-medium text-lg">Features</span>
						<hr className="my-2"></hr>
						{!description && (
							<div className="flex flex-col gap-2">
								<Skeleton
									variant="rounded"
									width={300}
									height={5}
									sx={{ fontSize: "0.8rem" }}
								/>
								<Skeleton
									variant="rounded"
									width={250}
									height={5}
									sx={{ fontSize: "0.8rem" }}
								/>
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
			{!ssvisible && (
				<DownloadCard
					id={description?.project_id}
					url={description?.project_link}
				/>
			)}
			<div className="hidden md:block">
				<Footer/>
			</div>
		</div>
	);
};

export default Description;
