import React from "react";

const DownloadCard = () => {
	return (
		<div className="bg-slate-50 p-2 fixed bottom-0 w-full flex items-center justify-center gap-8 px-5">
            <button className="mt-3">
                <i className="bi bi-heart text-primary text-2xl"></i>
            </button>
			<button className="bg-primary p-3 px-8 mt-3 w-full rounded-lg flex items-center gap-3 justify-center">
                <i className="bi bi-arrow-down-circle text-white"></i>
				<span className="text-white">Download Files</span>
			</button>
		</div>
	);
};

export default DownloadCard;
