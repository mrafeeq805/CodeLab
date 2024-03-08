import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FeaturesInput from "./FeaturesInput";
import axios from "axios";
import { useSelector } from "react-redux";
import SSCards from "./SSCards";
import { useNavigate } from "react-router-dom";
import { extractId } from "../utils/getDownloadFile";
import { useCookies } from "react-cookie";

const AddProjectPage = () => {
	const [cookies, removeCookie] = useCookies([]);
	const [titleError,setTitleError] = useState(false)
	const [languageError,setlanguageError] = useState(false)
	const [overviewError,setOverviewError] = useState(false)
	const [project_linkError,setProjectLINKError] = useState(false)
	const [thumbnailError,setThumbnailError] = useState(false)
	const [screenshotError,setScreenshotError] = useState(false)
	const [featuresError,setFeaturesError] = useState(false)

	const navigate = useNavigate()
	const features = useSelector((store) => store?.feature?.features)
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [thumbnail, setThumbnail] = useState(null);
	const [data, setData] = useState({
		title: "",
		category: "React JS",
		link: "",
		overview: "",
		languages: "",
		db: "No DB used",
		project_link :""
	});
	const changeInput = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
		data.project_link = extractId(data.project_link)
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
		  '^([a-zA-Z]+:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', // fragment locator
		  'i'
		);
		return pattern.test(str);
	  }

	const formHandler = async (e) => {
		
		e.preventDefault();
		console.log(features);
		setTitleError(false)
		setlanguageError(false)
		setOverviewError(false)
		setProjectLINKError(false)
		setScreenshotError(false)
		setThumbnailError(false)
		setFeaturesError(false)
		if(data.title === '') {
			return setTitleError(true)
		}else if(data.overview === ''){
			return setOverviewError(true)
		}else if (images.length === 0) {
			return setScreenshotError(true)
		}else if (!thumbnail) {
			return setThumbnailError(true)
		}else if (features === null) {
			return setFeaturesError(true)
		}else if(data.project_link=== '' || !isValidUrl(data.project_link)){
			return setProjectLINKError(true)
		}else if (data.languages === '') {
			return setlanguageError(true)
		}
		
		try {
			const postData = { ...data, screenshots: images, thumbnail: thumbnail,features:features };
			await axios.post("/addproject", postData);
			navigate("/")
			
		} catch (error) {
			console.log("error");
		}
	};
	useEffect(() => {
		console.log(cookies.token);
		if (cookies.token === "undefined" ) {
			navigate("/login");
		}
	},[])
	return (
		<div className="mt-16">
			<Navbar title={"Add Project"} />
			<form
				className="px-3"
				onSubmit={formHandler}
				encType="multipart/form-data">
				<label className="text-login font-medium ">Title</label>

				<input

					className="w-full text-login_light border-2 rounded-lg p-2 my-2"
					type="text"
					name="title"
					onChange={changeInput}
				/>
				{titleError && (<div className="mb-1">
					<span className="text-red-500 text-xs block">Enter a valid title</span>
				</div>)}
				

				<label className="text-login font-medium ">Category</label>
				<select
					className="w-full border-2 rounded-lg p-2 my-2 pr-2"
					name="category"
					onChange={changeInput}>
					<option value={"React JS"}>React JS</option>
				</select>

				<label className="text-login font-medium">Live Link (optional)</label>

				<input
					className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
					type="text"
					name="link"
					onChange={changeInput}
				/>
				

				<label className="text-login font-medium">Overview</label>

				<textarea
					className="w-full text-login_light min-h-24 border-2 rounded-lg flex justify-between p-2 my-2"
					name="overview"
					onChange={changeInput}
				/>
				{overviewError && (<div className="mb-1">
					<span className="text-red-500 text-xs block">Enter a valid overview</span>
				</div>)}

				{/* screenshots */}
				<div className="mt-2">
					<span className="font-medium text-login">Screenshots</span>

					<div className="grid grid-cols-3 gap-2 mt-2">
						<div className="flex items-center justify-center w-full">
							<label
								for="dropzone-file"
								className="flex px-8 flex-col items-center justify-center w-full p-2 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
									onChange={handleProductImageChange}
								/>
							</label>
						</div>
						{imagesPreview.map((item, index) => (
							<SSCards img={item} index={index} key={index} />
						))}
					</div>
				</div>
				{screenshotError && (<div className="mb-1">
					<span className="text-red-500 text-xs block">Select atleast one screenshot !</span>
				</div>)}
				{/* thumbnail */}
				<div className="mt-2">
					<span className="font-medium text-login">Cover Page Thumbnail</span>
					<div className="flex items-center justify-center mt-2">
						<label
							for="dropfile"
							className="flex px-8 w-full flex-col items-center justify-center p-2 h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
							{!thumbnail && (
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<i className="bi bi-cloud-arrow-up text-3xl text-gray-500"></i>
									<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
										<span className="font-semibold">Upload</span>
									</p>
								</div>
							)}
							{thumbnail && (
								<img className="h-full w-full" src={thumbnail} alt="thumb" />
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
				{thumbnailError && (<div className="mb-1">
					<span className="text-red-500 text-xs block">Pick a thumbnail image !</span>
				</div>)}
				<FeaturesInput />
				{featuresError && (<div className="mb-1">
					<span className="text-red-500 text-xs block">Enter a valid features</span>
				</div>)}
				{/* project file */}
				<label className="text-login font-medium">
					Project File Link (G Drive)
				</label>

				<input
					className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
					type="text"
					name="project_link"
					onChange={changeInput}
				/>
				{project_linkError && (<div className="mb-1">
					<span className="text-red-500 text-xs block">Enter a valid project link</span>
				</div>)}

				<label className="text-login font-medium ">Languages Used</label>

				<input
					className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
					type="text"
					placeholder="Eg : HTML,Javascript"
					name="languages"
					onChange={changeInput}
				/>
				{languageError && (<div className="mb-1">
					<span className="text-red-500 text-xs block">Enter a valid languages used</span>
				</div>)}
				<label className="text-login font-medium ">Database</label>

				<input
					className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
					type="text"
					placeholder="Eg : MongoDB, Firebase"
					name="db"
					onChange={changeInput}
				/>

				<button className=" bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddProjectPage;
