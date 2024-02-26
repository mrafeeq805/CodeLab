import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScreenshot } from "../utils/screenshotSlice";
import SSCards from "./SSCards";

const Screenshots = () => {
	const [image, setImage] = useState(null);
	const dispatch = useDispatch();
	const imglist = useSelector((store) => store?.screenshot?.screenshotsList);
	const onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
			dispatch(addScreenshot(URL.createObjectURL(event.target.files[0])));
			//console.log(image);
		}
	};
	return (
		<div className="mt-2">
			<span className="font-medium text-login">Screenshots</span>

			<div className="grid grid-cols-3 gap-2 mt-2">
				<div class="flex items-center justify-center w-full">
					<label
						for="dropzone-file"
						class="flex px-8 flex-col items-center justify-center w-full p-2 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
						<div class="flex flex-col items-center justify-center pt-5 pb-6">
							<i class="bi bi-cloud-arrow-up text-3xl text-gray-500"></i>
							<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
								<span class="font-semibold">Upload</span>
							</p>
						</div>
						<input
							id="dropzone-file"
							type="file"
							class="hidden"
							onChange={onImageChange}
						/>
					</label>
				</div>
				{imglist.map((item,index) => (
					<SSCards img={item} index={index} />
				))}
			</div>
		</div>
	);
};

export default Screenshots;
