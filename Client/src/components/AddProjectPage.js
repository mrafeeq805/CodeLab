import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FeaturesInput from "./FeaturesInput";
import axios from "axios";
import { useSelector } from "react-redux";
import SSCards from "./SSCards";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import FormLoading from "./skelton/FormLoading";
import Header from "./Header";
import { frameworks } from "../utils/frameworks";
import {categories} from "../utils/categories"

const AddProjectPage = () => {
	const [cookies, removeCookie] = useCookies([]);
	const [selectedFramework, setSelectedFramework] = useState([]);
	const [titleError, setTitleError] = useState(false);
	const [languageError, setlanguageError] = useState(false);
	const [overviewError, setOverviewError] = useState(false);
	const [project_linkError, setProjectLINKError] = useState(false);
	const [thumbnailError, setThumbnailError] = useState(false);
	const [screenshotError, setScreenshotError] = useState(false);
	const [categoryError, setCategoryError] = useState(false);
	const [featuresError, setFeaturesError] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [category, setCategory] = useState(null);


	const navigate = useNavigate();
	const features = useSelector((store) => store?.feature?.features);
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [thumbnail, setThumbnail] = useState(null);
	const changeSelectedFramework = (e) => {
		if(!selectedFramework.includes(e.target.value)){
			setSelectedFramework((list) => [...list, e.target.value]);
		}
		
	};
	const [data, setData] = useState({
		title: "",
		category: "Choose",
		link: "",
		overview: "",
		db: "No DB used",
		project_link: "",
	});
	const changeInput = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handleProductImageChange = (e) => {
		const files = Array.from(e.target.files);
		setImages([]);
		setImagesPreview([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((oldImages) => [...oldImages, reader.result]);
					setImages((oldImages) => [...oldImages, reader.result]);
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
	const isValidUrl = (str) => {
		const pattern = new RegExp(
			"^([a-zA-Z]+:\\/\\/)?" + // protocol
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
				"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
				"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
				"(\\#[-a-z\\d_]*)?$", // fragment locator
			"i"
		);
		return pattern.test(str);
	};

	const formHandler = async (e) => {
		e.preventDefault();
		setTitleError(false);
		setlanguageError(false);
		setOverviewError(false);
		setProjectLINKError(false);
		setScreenshotError(false);
		setThumbnailError(false);
		setFeaturesError(false);
		if (data.title === "") {
			return setTitleError(true);
		} else if (data.category === "Choose") {
			return setCategoryError(true);
		} else if (data.project_link === "" || !isValidUrl(data.project_link)) {
			return setProjectLINKError(true);
		} else if (data.overview === "") {
			return setOverviewError(true);
		} else if (images.length === 0) {
			return setScreenshotError(true);
		} else if (!thumbnail) {
			return setThumbnailError(true);
		} else if (features === null) {
			return setFeaturesError(true);
		} else if (selectedFramework.length === 0) {
			return setlanguageError(true);
		}
		setSubmitted(true);

		try {
			const postData = {
				...data,
				screenshots: images,
				thumbnail: thumbnail,
				features: features,
				frameworks_used : selectedFramework
			};
			await axios.post("/api/addproject", postData)
			.then(() => {
				navigate("/");
				setSubmitted(false);
			}).catch((err) => {
				console.log(err);
			})
			
		} catch (error) {
			setSubmitted(false);
			console.log("error");
		}
	};
	useEffect(() => {
		console.log(cookies.token);
		if (cookies.token === "undefined" || !cookies.token) {
			navigate("/login");
		}
		async function call () {
			const {data} = await axios.get('/api/getallcategories')
			setCategory(data)
		}
		call()
	}, []);
	return (
		<div className="mt-16 md:mt-24 relative md:mb-16">
			<Navbar title={"Add Project"} />
			<div className="hidden md:block">
				<Header />
			</div>

			{submitted && <FormLoading />}
			<div className="hidden md:flex gap-2 px-44 mt-5">
				<Link className="text-sm text-gray-400 md:text-base" to={'/'}>Home</Link>
				<span className="text-sm text-gray-400 md:text-base">/</span>
				<span className="text-sm text-gray-400 md:text-base">Projects</span>
				<span className="text-sm text-gray-400 md:text-base">/</span>
				<span className="text-sm text-gray-400 md:text-base font-medium">
					Add Project
				</span>
			</div>
			<form
				className="px-3 md:px-44 md:mt-12"
				onSubmit={formHandler}
				encType="multipart/form-data">
				<div className="md:flex w-full md:gap-10">
					<div className="w-full">
						<label className="text-login font-medium ">Title</label>
						<input
							className="w-full text-login_light border-2 rounded-lg p-2 my-2"
							type="text"
							name="title"
							onChange={changeInput}
						/>
						{titleError && (
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
							className="w-full border-2 rounded-lg p-2 my-2 pr-2"
							name="category"
							onChange={changeInput}>
							<option value={'Choose'} disabled selected>Choose</option>
							{categories?.map((item) => (
								<option value={item}>{item}</option>
							))}
						</select>
						{categoryError && (
							<div className="mb-1">
								<span className="text-red-500 text-xs block">
									Select a valid category
								</span>
							</div>
						)}
					</div>
				</div>
				<div className="md:flex w-full md:gap-10">
					<div className="w-full">
						<label className="text-login font-medium">
							Live Link (optional)
						</label>

						<input
							className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
							type="text"
							name="link"
							onChange={changeInput}
						/>
					</div>
					<div className="w-full">
						<label className="text-login font-medium">
							Project File Link (G Drive)
						</label>

						<input
							className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
							type="text"
							name="project_link"
							onChange={changeInput}
						/>
						{project_linkError && (
							<div className="mb-1">
								<span className="text-red-500 text-xs block">
									Enter a valid project link
								</span>
							</div>
						)}
					</div>
				</div>
				<div className="md:flex md:gap-10 w-full">
					<div className="w-full">
						<label className="text-login font-medium">Overview</label>

						<textarea
							className="w-full text-login_light min-h-24 md:min-h-44 border-2 rounded-lg flex justify-between p-2 my-2"
							name="overview"
							onChange={changeInput}
						/>
						{overviewError && (
							<div className="mb-1">
								<span className="text-red-500 text-xs block">
									Enter a valid overview
								</span>
							</div>
						)}
					</div>
					<div className="w-full">
						{/* thumbnail */}
						<div className="mt-2">
							<span className="font-medium text-login">
								Cover Page Thumbnail
							</span>
							<div className="flex items-center justify-center mt-2">
								<label
									for="dropfile"
									className="flex px-8 w-full flex-col items-center justify-center p-2 h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
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
										accept="image/*"
										className="hidden"
										onChange={onImageChange}
									/>
								</label>
							</div>
						</div>
						{thumbnailError && (
							<div className="mb-1">
								<span className="text-red-500 text-xs block">
									Pick a thumbnail image !
								</span>
							</div>
						)}
					</div>
				</div>

				{/* screenshots */}
				<div className="mt-2">
					<span className="font-medium text-login">Screenshots</span>

					<div className="grid grid-cols-3 gap-2 mt-2 md:w-8/12 md:h-36">
						<div className="flex items-center justify-center w-full">
							<label
								for="dropzone-file"
								className="flex px-8 flex-col md:h-full items-center justify-center w-full p-2 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 ">
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
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
									accept="image/*"
									onChange={handleProductImageChange}
								/>
							</label>
						</div>
						{imagesPreview.map((item, index) => (
							<SSCards img={item} index={index} key={index} />
						))}
					</div>
				</div>
				{screenshotError && (
					<div className="mb-1">
						<span className="text-red-500 text-xs block">
							Select atleast one screenshot !
						</span>
					</div>
				)}

				<FeaturesInput />
				{featuresError && (
					<div className="mb-1">
						<span className="text-red-500 text-xs block">
							Enter a valid features
						</span>
					</div>
				)}
				{/* project file */}
				<div className="md:flex md:gap-10 w-full">
					<div className="w-full">
						<label className="text-login font-medium ">
							Languages / Frameworks Used
						</label>
						<select
							name="languages"
							onChange={changeSelectedFramework}
							className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2">
							<option value={"Choose"} disabled selected>Choose</option>
							{category?.map((item) => (
								<option value={item.title}>{item.title}</option>
							))}
						</select>
						<div className="flex flex-wrap gap-3">
							{selectedFramework?.map((item,index) => (<div
								id="new+div"
								class="flex bg-primary rounded-full p-1 pl-3 w-max gap-2 h-max">
								<div>
									<span class="text-white">{item}</span>
								</div>
								<button
									onClick={() => {
										selectedFramework.splice(index,1)
										setSelectedFramework([...selectedFramework])
									}}
									type="button"
									id="new+button"
									class=" text-white rounded-full h-6 w-6">
									<i class="bi bi-x"></i>
								</button>
							</div>))}
						</div>


						{/* <input
							className="hidden w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
							type="text"
							placeholder="Eg : HTML,Javascript"
							name="languages"
							onChange={changeInput}
						/> */}
						{languageError && (
							<div className="mb-1">
								<span className="text-red-500 text-xs block">
									Pick atleast one languages used
								</span>
							</div>
						)}
					</div>
					<div className="w-full">
						<label className="text-login font-medium ">Database</label>

						<input
							className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
							type="text"
							placeholder="Eg : MongoDB, Firebase"
							name="db"
							onChange={changeInput}
						/>
					</div>
				</div>

				<div className="w-full md:flex md:justify-end">
					<button className=" bg-primary p-2 w-full md:w-1/2 rounded-lg text-xl text-white py-3 mt-5">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddProjectPage;
