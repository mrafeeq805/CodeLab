import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FeaturesInput from "./FeaturesInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SSCards from "./SSCards";
import { Link, useNavigate, useParams } from "react-router-dom";
import { extractId } from "../utils/getDownloadFile";
import addDescription from "../utils/projectSlice";
import ReactQuill from "react-quill";
import NotFound from "./NotFound";
import FormLoading from "./skelton/FormLoading";
import { categories } from "../utils/categories";
import Header from "./Header";
import Footer from './Footer'
import {Bounce, ToastContainer, toast} from 'react-toastify'

const EditProjectPage = () => {
	var imglist = [];
	const { id } = useParams();
	const dispatch = useDispatch();
	const [category, setCategory] = useState(null);
	const navigate = useNavigate();
	const [submitted, setSubmitted] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [thumbnail, setThumbnail] = useState(null);
	const [features, setFeatures] = useState(null);
	const [selectedFramework, setSelectedFramework] = useState([]);
	const changeSelectedFramework = (e) => {
		if (!selectedFramework.includes(e.target.value)) {
			setSelectedFramework((list) => [...list, e.target.value]);
		}
	};
	const [data, setData] = useState({
		title: "",
		category: "",
		live_link: "",
		overview: "",
		db_used: "",
		project_link: "",
	});
	useEffect(() => {
		async function call() {
			await axios
				.get("/api/editinfo/" + id)
				.then(async (res) => {
					if (res?.data?.status === "ok") {
						const details = res?.data?.details;
						setData({
							...data,
							title: details?.title,
							live_link: details?.live_link,
							category: details?.category,
							overview: details?.overview,
							db_used: details?.db_used,
							project_link: details?.project_link,
						});
						setThumbnail(details?.thumbnail);
						setFeatures(details?.features);
						setImagesPreview(details?.screenshots);
						setSelectedFramework(details?.frameworks_used);
						async function callCategoris() {
							await axios.get("/getallcategories").then(({ data }) => {
								setCategory(data);
							});
						}
						callCategoris();
					} else {
						setNotFound(true);
						navigate("/login");
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

	const changeInput = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
		data.project_link = extractId(data.project_link);
	};
	const handleProductImageChange = (e) => {
		const files = Array.from(e.target.files);
		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((oldImages) => [...oldImages, reader.result]);
					setImages((oldImages) => [...oldImages, reader.result]);
					console.log(imagesPreview);
				}
			};
			reader.readAsDataURL(file);
		});
	};
	const onImageChange = (e) => {
		setThumbnail(null);

		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setThumbnail(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const formHandler = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		try {
			const postData = {
				...data,
				screenshots: imagesPreview,
				thumbnail: thumbnail,
				features: features,
				project_id: id,
				frameworks_used: selectedFramework,
			};
			await axios.post("/api/editproject", postData).then((res) => {
				console.log(res);
				if (res?.data?.status === "ok") {
					setSubmitted(false);
					navigate("/");
				} else {
					setNotFound(true);
					setSubmitted(false);
					navigate("/login");
				}
			});
		} catch (error) {
			console.log("error");
		}
	};
	const removeHandler = (index) => {
		imagesPreview.splice(index, 1);
		setImagesPreview([...imagesPreview]);
	};
	return (
		<div className="mt-16 relative md:my-24">
			<Navbar title={"Modify Project"} />
			<ToastContainer/>
			<div className="hidden md:block">
				<Header />
			</div>
			
			<div className="hidden md:flex gap-2 md:px-56 ">
				<Link to={"/"} className="text-sm text-gray-400 md:text-base">
					Home
				</Link>
				<span className="text-sm text-gray-400 md:text-base">/</span>
				<Link to={"/myprojects"} className="text-sm text-gray-400 md:text-base">
					My Projects
				</Link>
				<span className="text-sm text-gray-400 md:text-base">/</span>
				<span className="text-sm text-gray-400 md:text-base font-medium">
					Project ID - {id}
				</span>
			</div>
			{notFound && <NotFound />}
			{submitted && <FormLoading />}
			{!notFound && (
				<div className="md:px-56 md:mt-5">
					<form
						className="px-3 md:px-0"
						onSubmit={formHandler}
						encType="multipart/form-data">
						<div className="md:flex md:gap-24">
							<div className="w-full">
								<label className="text-login font-medium ">Title</label>

								<input
									value={data?.title}
									className="w-full text-login_light border-2 rounded-lg p-2 my-2"
									type="text"
									name="title"
									onChange={changeInput}
								/>
								{false && (
									<div className="mb-1">
										<span className="text-red-500 text-xs block">
											Enter a valid title
										</span>
									</div>
								)}
							</div>
							<div className="w-full">
								<label className="text-login font-medium ">Category</label>
								<select
									value={data?.category}
									className="w-full border-2 rounded-lg p-2 my-2 pr-2"
									name="category"
									onChange={changeInput}>
									{categories?.map((item) => (
										<option value={item}>{item}</option>
									))}
								</select>
							</div>
						</div>
						<div className="md:flex md:gap-24">
							<div className="w-full">
								<label className="text-login font-medium">Live Link</label>

								<input
									value={data?.live_link}
									className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
									type="text"
									name="live_link"
									onChange={changeInput}
								/>
							</div>
							<div className="w-full">
								<label className="text-login font-medium">Overview</label>

								<textarea
									className="w-full text-login_light min-h-44 md:min-h-48 border-2 rounded-lg flex justify-between p-2 my-2"
									name="overview"
									onChange={changeInput}
									value={data?.overview}
								/>
							</div>
						</div>
					
						{/* screenshots */}
						<div className="mt-2">
							<span className="font-medium text-login">Screenshots</span>

							<div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-2">
								<div className="flex items-center justify-center w-full">
									<label
										for="dropzone-file"
										className="flex px-8 flex-col items-center justify-center w-full md:w-56 p-2 h-24 md:h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 ">
										<div className="flex flex-col items-center justify-center pt-5 pb-6 ">
											<i className="bi bi-cloud-arrow-up text-3xl text-gray-500"></i>
											<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
												<span className="font-semibold">Upload</span>
											</p>
										</div>
										<input
											id="dropzone-file"
											type="file"
											multiple
											className="hidden"
											onChange={handleProductImageChange}
										/>
									</label>
								</div>
								{imagesPreview.map((item, index) => (
									<div className="border-2 rounded-md p-1 h-24 md:h-32 md:w-52 relative ">
										<img className="h-full w-full object-cover" src={item} alt="icon" />
										{
											<button
												type="button"
												onClick={() => removeHandler(index)}
												className="absolute top-0 right-0 bg-slate-50 h-7 w-7 rounded-full">
												<i className="bi bi-x text-xl"></i>
											</button>
										}
									</div>
								))}
							</div>
						</div>
						<div className="md:flex md:gap-24 md:my-5">
							<div className="w-full">
								{/* thumbnail */}
								<div className="mt-2">
									<span className="font-medium text-login">
										Cover Page Thumbnail
									</span>
									<div className="flex items-center justify-center mt-2">
										<label
											for="dropfile"
											className="flex px-8 w-full flex-col items-center justify-center p-2 h-44 md:h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 ">
											{!thumbnail && (
												<div className="flex flex-col items-center justify-center pt-5 pb-6">
													<i className="bi bi-cloud-arrow-up text-3xl text-gray-500"></i>
													<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
														<span className="font-semibold">Upload</span>
													</p>
												</div>
											)}
											{thumbnail && (
												<img
													className="h-full w-full object-cover"
													src={thumbnail}
													alt="thumb"
												/>
											)}
											<input
												id="dropfile"
												type="file"
												className="hidden"
												onChange={onImageChange}
											/>
										</label>
									</div>
								</div>
							</div>
							<div className="w-full">
								<div className="mt-2" id="editor">
									<span className="font-medium">Features</span>
									<div className="my-2">
										<ReactQuill
											className=""
											onChange={(e) => setFeatures(e)}
											value={features}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="md:flex md:gap-24">
							<div className="w-full">
								{/* project file */}
								<label className="text-login font-medium">
									Project File Link (G Drive)
								</label>

								<input
									className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
									type="text"
									name="project_link"
									onChange={changeInput}
									value={data?.project_link}
								/>
							</div>
							<div className="w-full">
								<label className="text-login font-medium ">
									Languages Used
								</label>

								<select
									name="languages"
									onChange={changeSelectedFramework}
									className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2">
									{category?.map((item) => (
										<option value={item.title}>{item.title}</option>
									))}
								</select>
								<div className="flex flex-wrap gap-3">
									{selectedFramework?.map((item, index) => (
										<div
											id="new+div"
											class="flex bg-primary rounded-full p-1 pl-3 w-max gap-2 h-max">
											<div>
												<span class="text-white">{item}</span>
											</div>
											<button
												onClick={() => {
													selectedFramework.splice(index, 1);
													setSelectedFramework([...selectedFramework]);
												}}
												type="button"
												id="new+button"
												class=" text-white rounded-full h-6 w-6">
												<i class="bi bi-x"></i>
											</button>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="md:flex md:gap-24">
							<div className="w-full">
								<label className="text-login font-medium ">Database</label>

								<input
									className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
									type="text"
									placeholder="Eg : MongoDB, Firebase"
									name="db_used"
									onChange={changeInput}
									value={data?.db_used}
								/>
							</div>
							<button className=" h-max bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
								Update Details
							</button>
						</div>
					</form>
				</div>
			)}
			<div className="hidden md:block md:mt-8">
				<Footer/>
			</div>
		</div>
	);
};

export default EditProjectPage;
