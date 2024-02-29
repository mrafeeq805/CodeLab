import React, { useState } from "react";

const UploadThumbanail = () => {
    const [image, setImage] = useState(null);
	const onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
			//console.log(image);
		}
	};
	return (
		<div className="mt-2">
			<span className="font-medium text-login">Cover Page Thumbnail</span>
			<div className="flex items-center justify-center mt-2">
				<label
					for="dropfile"
					className="flex px-8 w-full flex-col items-center justify-center p-2 h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
					{!image && (<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<i className="bi bi-cloud-arrow-up text-3xl text-gray-500"></i>
						<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
							<span className="font-semibold">Upload</span>
						</p>
					</div>)}
                    {image && <img className="h-full w-full" src={image} alt="thumb"/>}
					<input id="dropfile" type="file" className="hidden" onChange={onImageChange} />
				</label>
                
			</div>
		</div>
	);
};

export default UploadThumbanail;
