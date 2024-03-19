import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DevInfo from "./DevInfo";
import DevProjecInfo from "./DevProjecInfo";
import TechStackSection from "./TechStackSection";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ProjectCardSecLoader from "./skelton/ProjectCardSecLoader";
import ProjectCardSec from "./ProjectCardSec";
import Header from "./Header";
import Footer from "./Footer";
import {Bounce, ToastContainer, toast} from 'react-toastify'

const DeveloperPage = () => {
	const [emptyData, setEmptyData] = useState(false);
	const user = useSelector((store) => store?.user?.user);
	const [devinfo, setDevinfo] = useState(null);
	const [projects, setProjects] = useState(null);
	const { id } = useParams();
	const dispatch = useDispatch();
	const count = [1, 2];
	useEffect(() => {
		async function call() {
			await axios
				.get("/getDeveloperProjects/" + id)
				.then((res) => {
					console.log(res?.data);
					if (res?.data?.projects.length === 0) {
						setEmptyData(true);
					} else {
						setEmptyData(false);
						//dispatch(addDeveloperProjects(res?.data?.projects))
						setProjects(res?.data?.projects);
						setDevinfo(res?.data);
						console.log(res?.data);
					}
				})
				.catch((err) => {
					toast.warn("Something went wrong !",{
						position: "top-center",
						autoClose: 2000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition : Bounce
						
					});
				});
		}
		call();
	}, []);
	return (
		<div className="bg-slate-50 flex-col mt-16 md:mt-20 md:pt-3 md:h-screen">
			<Navbar title={devinfo?.details?.name} />
			<div className="hidden md:block">
				<Header />
			</div>
			<ToastContainer/>
			<div className=" gap-2 hidden md:flex px-32">
				<Link to={'/'} className="text-sm text-gray-400 md:text-base">Home</Link>
				<span className="text-sm text-gray-400 md:text-base">/</span>
				<span className="text-sm text-gray-400 md:text-base">Developers</span>
				<span className="text-sm text-gray-400 md:text-base">/</span>
				<span className="text-sm text-gray-400 md:text-base font-medium">{id}</span>
			</div>

			<div className=" w-full md:mt-12">
				<div className="md:w-5/12 md:flex md:px-32">
					<DevInfo data={devinfo?.details} />
					
					<div className=" p-4 px-8 md:hidden">
						<p className="text-gray-500 text-sm text-center">
							{devinfo?.details?.bio}
						</p>
					</div>
				</div>
				<hr className="hidden md:block my-4"></hr>
				<div className="md:hidden">
					<DevProjecInfo
						views={devinfo?.views}
						projects={devinfo?.projectsCount}
					/>
					<TechStackSection data={devinfo?.stacks_used} />
				</div>
			</div>
			<div className="md:flex md:gap-8 md:px-32 md:mt-2">
				<div className="hidden md:block md:w-6/12">
					<div className=" p-4  md:bg-white my-5">
						<p className="text-gray-500 text-base ">{devinfo?.details?.bio}</p>
					</div>
					<DevProjecInfo
						views={devinfo?.views}
						projects={devinfo?.projectsCount}
					/>
					<TechStackSection data={devinfo?.stacks_used} />
				</div>
				<div className="md:w-full md:bg-white md:p-4 mb-5">
					{!emptyData && (
						<div className="px-2 mt-4">
							<span className="font-medium md:text-lg">
								Projects ({projects ? projects.length : 0})
							</span>

							<div className="mt-3 grid md:grid-cols-2 grid-flow-row gap-2 md:gap-8">
								{!projects &&
									count?.map((item) => <ProjectCardSecLoader key={item} />)}
								{projects &&
									projects?.map((item, index) => (
										<ProjectCardSec key={index} data={item} />
									))}
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="hidden md:block mt-5">
				<Footer/>
			</div>
		</div>
	);
};

export default DeveloperPage;
