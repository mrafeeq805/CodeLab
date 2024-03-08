import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FeaturesInput from "./FeaturesInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SSCards from "./SSCards";
import { useNavigate, useParams } from "react-router-dom";
import { extractId } from "../utils/getDownloadFile";
import addDescription from "../utils/projectSlice";
import ReactQuill from "react-quill";
import NotFound from "./NotFound";

const EditProjectPage = () => {
	var imglist = [];
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [submitted,setSubmitted] = useState(false)
	const [notFound, setNotFound] = useState(false);
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [thumbnail, setThumbnail] = useState(null);
	const [features, setFeatures] = useState(null);

	const [data, setData] = useState({
		title: "",
		category: "",
		live_link: "",
		overview: "",
		frameworks_used: "",
		db_used: "",
		project_link: "",
	});
	useEffect(() => {
		async function call() {
			await axios
				.get("/editinfo/" + id)
				.then(async (res) => {
					console.log(res);
					if (res?.data?.status === "ok") {
						const details = res?.data?.details;
						setData({
							...data,
							title: details?.title,
							live_link: details?.live_link,
							category: details?.category,
							overview: details?.overview,
							frameworks_used: details?.frameworks_used,
							db_used: details?.db_used,
							project_link: details?.project_link,
						});
						setThumbnail(details?.thumbnail);
						setFeatures(details?.features);
						setImagesPreview(details?.screenshots);
						
					} else {
						
						setNotFound(true);
						navigate("/login");
					}
				})
				.catch((err) => {
					console.log(err);
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
		setSubmitted(true)
		try {
			const postData = {
				...data,
				screenshots: imagesPreview,
				thumbnail: thumbnail,
				features: features,
				project_id: id,
			};
			await axios.post("/editproject", postData)
			.then((res) => {
				if(res?.data?.status === "ok"){
					setSubmitted(false)
					navigate("/");
				}else{
					setNotFound(true)
					setSubmitted(false)
					navigate("/login");
				}
				
			})

			
		} catch (error) {
			console.log("error");
		}
	};
	const removeHandler = (index) => {
		imagesPreview.splice(index, 1);
		console.log(imagesPreview);
		setImagesPreview([...imagesPreview]);
	};
	return (
		<div className="mt-16 relative">
			<Navbar title={"Modify Project"} />
			{notFound && <NotFound />}
			{!notFound && submitted && (
				<div>
					<form
						className="px-3"
						onSubmit={formHandler}
						encType="multipart/form-data">
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

						<label className="text-login font-medium ">Category</label>
						<select
							value={data?.category}
							className="w-full border-2 rounded-lg p-2 my-2 pr-2"
							name="category"
							onClick={changeInput}>
							<option value={"React JS"}>React JS</option>
							<option value={"Laravel"}>Laravel</option>
						</select>

						<label className="text-login font-medium">Live Link</label>

						<input
							value={data?.live_link}
							className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
							type="text"
							name="live_link"
							onChange={changeInput}
						/>

						<label className="text-login font-medium">Overview</label>

						<textarea
							className="w-full text-login_light min-h-24 border-2 rounded-lg flex justify-between p-2 my-2"
							name="overview"
							onChange={changeInput}
							value={data?.overview}
						/>

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
									<div className="border-2 rounded-md p-1 h-24 relative">
										<img className="h-full w-full" src={item} alt="icon" />
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
						{/* thumbnail */}
						<div className="mt-2">
							<span className="font-medium text-login">
								Cover Page Thumbnail
							</span>
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
										<img
											className="h-full w-full"
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

						<label className="text-login font-medium ">Languages Used</label>

						<input
							className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
							type="text"
							placeholder="Eg : HTML,Javascript"
							name="frameworks_used"
							onChange={changeInput}
							value={data?.frameworks_used}
						/>
						<label className="text-login font-medium ">Database</label>

						<input
							className="w-full text-login_light border-2 rounded-lg flex justify-between p-2 my-2"
							type="text"
							placeholder="Eg : MongoDB, Firebase"
							name="db_used"
							onChange={changeInput}
							value={data?.db_used}
						/>

						<button className=" bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
							Update Details
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default EditProjectPage;
