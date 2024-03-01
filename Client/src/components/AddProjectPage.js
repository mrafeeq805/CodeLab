import React, { useState } from "react";
import Navbar from "./Navbar";
import FeaturesInput from "./FeaturesInput";
import axios from "axios";
import { useSelector } from "react-redux";
import SSCards from "./SSCards";

const AddProjectPage = () => {
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [thumbnail, setThumbnail] = useState(null);
	const [data, setData] = useState({
		title: "",
		category: "",
		link: "",
		overview: "",
		languages: "",
		db: "",

	});
	const changeInput = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handleProductImageChange = (e) => {
		const files = Array.from(e.target.files);
		console.log(files);
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
				setThumbnail(reader.result)
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const formHandler = async (e) => {
		e.preventDefault();
		try {
			const postData = { ...data, screenshots: images,thumbnail:thumbnail };
			await axios.post("/addproject", postData);
		} catch (error) {
			console.log("error");
		}
	};
	return (
		<div className="mt-16">
			<Navbar title={"Add Project"} />
			<form
				className="px-3"
				onSubmit={formHandler}
				encType="multipart/form-data">
				<label className="text-login font-medium ">Title</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input
						className="w-full text-login_light"
						type="text"
						name="title"
						onChange={changeInput}
					/>
				</div>
				<label className="text-login font-medium ">Category</label>
				<select
					className="w-full border-2 rounded-lg p-2 my-2 pr-2"
					name="category"
					onClick={changeInput}>
					<option value={"React JS"}>React JS</option>
				</select>

				<label className="text-login font-medium">Live Link</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input
						className="w-full text-login_light"
						type="text"
						name="link"
						onChange={changeInput}
					/>
				</div>
				<label className="text-login font-medium">Overview</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<textarea
						className="w-full text-login_light min-h-24"
						name="overview"
						onChange={changeInput}
					/>
				</div>
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
				<FeaturesInput />
				{/* project file */}
				<label className="text-login font-medium">Project File Link (G Drive)</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input
						className="w-full text-login_light"
						type="text"
						name="project"
						onChange={changeInput}
					/>
				</div>
				<label className="text-login font-medium ">Languages Used</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input
						className="w-full text-login_light"
						type="text"
						placeholder="Eg : HTML,Javascript"
						name="languages"
						onChange={changeInput}
					/>
				</div>
				<label className="text-login font-medium ">Database</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input
						className="w-full text-login_light"
						type="text"
						placeholder="Eg : MongoDB, Firebase"
						name="db"
						onChange={changeInput}
					/>
				</div>
				<button className=" bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddProjectPage;
