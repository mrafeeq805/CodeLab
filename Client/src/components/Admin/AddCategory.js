import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


const AddCategory = ({ setShowAdd , setCategoryList}) => {
	const [categories,setCategories] = useState(null)
	const name = useRef(null);
	const [icon, setIcon] = useState(null);
	const [categoryError, setCategoryError] = useState(false);
	const [imgError, setImgError] = useState(false);
	const [status, setStatus] = useState("Listed");
	const [main, setMain] = useState("Web App Development");

	const changeImage = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setIcon(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};
	const formHandler = async (e) => {
		e.preventDefault();
		setCategoryError(false);
		setImgError(false);
		if (name.current.value === "") return setCategoryError(true);
		if (!icon) return setImgError(true);
		await axios
			.post("/api/admin/addcategory", {
				title: name.current.value,
				icon: icon,
				status: status,
				main: main,
			})
			.then(({ data,status }) => {
                console.log(data);
				if (status === 200) {
                    setCategoryList(data)
					setShowAdd(false);
				} else {
					console.log(data.status);
				}
			});
	};

	return (
		<div className="transition ease-out duration-3000 w-full justify-center items-center flex fixed inset-0 z-50 bg-[rgba(0,0,0,0.2)]">
			<div className="w-full flex justify-center items-center">
				<div className="bg-white w-2/5 p-6 rounded-sm mt-3 relative">
					<div className="border-b-2 w-max pb-1">
						<span className="text-xl font-semibold ">Add Category</span>
					</div>
					<script src="/javascript/admin/category.js"></script>
					<form onSubmit={formHandler} enctype="multipart/form-data">
						<label className="block my-2 text-[#00000080]" for="">
							Category Name
						</label>
						<input
							ref={name}
							className="border rounded-md p-2 w-full mb-2"
							type="text"
						/>
						{categoryError && (
							<span className="text-red-500 text-xs">
								category name cannot empty!
							</span>
						)}

						<label className="block my-2 text-[#00000080]" for="">
							Image Icon
						</label>
						<div className="flex gap-4 mb-2">
							<div className="flex items-center justify-center w-1/2">
								<label
									for="add-category-upload"
									className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
									{icon && (
										<div className="flex justify-center items-center w-full">
											<img className="h-32" src={icon} alt="imag" />
										</div>
									)}
									{!icon && (
										<div className="flex flex-col items-center justify-center pt-5 pb-6">
											<i className="bi bi-cloud-arrow-up text-3xl text-gray-500"></i>
										</div>
									)}
									<input
										id="add-category-upload"
										onChange={changeImage}
										type="file"
										className="hidden"
									/>
								</label>
							</div>
						</div>
						{imgError && (
							<span
								id="add-category-image-error"
								className="text-red-500 text-xs">
								image cannot empty!
							</span>
						)}

						<div className="w-full flex gap-5">
							<div className="w-full">
								<label className="block my-2 text-[#00000080]" for="">
									Main Category
								</label>
								<select
									className="border rounded-md p-3 text-gray-500 w-full"
									onChange={(e) => setMain(e.target.value)}>
									{categories?.map(item => (<option value={item}>
										{item}
									</option>))}
									
								</select>
							</div>
							<div className="w-full">
								<label className="block my-2 text-[#00000080]" for="">
									Status
								</label>
								<select
									className="border rounded-md p-3 text-gray-500 w-full"
									onChange={(e) => setStatus(e.target.value)}>
									<option value="Listed">Listed</option>
									<option value="Unlisted">Unlisted</option>
								</select>
							</div>
						</div>

						<div className="flex justify-end mt-6">
							<button
								type="submit"
								value="submit"
								onclick="return validateAddCategory()"
								className="rounded-md bg-blue-500 text-white text-sm p-3 w-1/2">
								Add Category
							</button>
						</div>
						<button
							type="button"
							onClick={() => setShowAdd(false)}
							className=" text-gray-500 absolute top-5 right-5">
							<i className="bi bi-x-circle text-2xl text-gray-500"></i>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddCategory;
