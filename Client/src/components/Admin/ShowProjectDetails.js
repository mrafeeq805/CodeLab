import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const ShowProjectDetails = ({ setShowData, id ,setProjectList}) => {
	const [details, setDetails] = useState(null);
	const reason = useRef(null)
	const approveHandler = async () => {
		await axios.post('/admin/approveproject',{project_id:id})
		.then(({data}) => {
			setProjectList(data)
			setShowData(false)
		})
	}
	const rejectHandler = async () => {
		if(reason.current.value === ''){
			return;
		}
		await axios.post('/admin/rejectproject',{project_id:id,reason:reason.current.value,publisher_id:details?.publisher_id})
		.then(({data}) => {
			setProjectList(data)
			setShowData(false)
		})
	}
	useEffect(() => {
		axios
			.post("/admin/getprojectdetails", {
				id: id,
			})
			.then(({ data }) => {
				setDetails(data);
			});
	}, []);
	return (
		<div
			id="showorder"
			class="transition ease-out duration-3000 flex w-full justify-center items-center fixed inset-0 z-50 bg-[rgba(0,0,0,0.2)] p-12">
			<div class="w-full overflow-y-scroll h-full">
				<div class="w-full flex justify-center items-center overflow-y-scroll">
					<div class="bg-white w-9/12 p-6 rounded-sm mt-3 overflow-y-scroll relative">
						<div class="border-b-2 pb-2 w-max">
							<span class="text-xl font-semibold ">Project Details</span>
						</div>

						<div class="grid grid-cols-2 gap-5">
							<div class="bg-gray-100 space-y-2 my-3 p-5 overflow-y-scroll h-96">
								<h1 class="text-lg font-bold">Details</h1>
								<div class="flex justify-between ">
									<span class="text-gray-500">Title</span>
									<span id="order-name">{details?.title || ""}</span>
								</div>
								<div class="flex justify-between ">
									<span class="text-gray-500">Category</span>
									<span id="order-phone">{details?.category || ""}</span>
								</div>
								<div class="flex justify-between ">
									<span class="text-gray-500">Publisher</span>
									<span id="order-building">{details?.publisher || ""}</span>
								</div>
								<div class="flex justify-between ">
									<span class="text-gray-500">Project Link</span>
									<span id="order-area"></span>
									{details?.project_link || ""}
								</div>
								<div class="flex justify-between ">
									<span class="text-gray-500">Live Link</span>
									<span id="order-city">{details?.live_link || ""}</span>
								</div>
								<div class="flex justify-between ">
									<span class="text-gray-500">Frameworks Used</span>
									<span id="order-state">{details?.frameworks_used || ""}</span>
								</div>
								<div class="flex justify-between ">
									<span class="text-gray-500">DB Used</span>
									<span id="order-pin">{details?.db_used || ""}</span>
								</div>
								<div class="flex justify-between gap-4">
									<span class="text-gray-500">Overview</span>

									<span id="order-landmark">{details?.overview || ""}</span>
								</div>
							</div>

							<div class="bg-gray-100 space-y-2 my-3 p-5 h-96">
								<h1 class="text-lg font-bold">Features</h1>
								<div class="flex justify-between ">
									<div
										dangerouslySetInnerHTML={{
											__html: details?.features,
										}}></div>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-5">
							<div class="bg-gray-100 space-y-2 my-3 p-5 overflow-y-scroll h-72">
								<h1 class="text-lg font-bold">Screenshots</h1>
								<div className="grid grid-cols-1">
									{details?.screenshots.map((item) => (
										<img src={item} alt="thumb" />
									))}
								</div>
							</div>
							<div class="bg-gray-100 space-y-2 my-3 p-5">
								<h1 class="text-lg font-bold">Thumbnail</h1>
								<img src={details?.thumbnail} alt="thumb" />
							</div>
						</div>
						<div class="flex  mt-6 gap-4">
							<textarea
								ref={reason}
								className="border-2 rounded-md min-h-28 w-96 p-3"
								type="text"
								placeholder="Enter rejection reason here !"
							/>
							<button
								onClick={rejectHandler}
								type=""
								value="submit"
								class="rounded-md bg-red-500 text-white text-sm p-3 w-max px-10 h-max">
								Reject
							</button>
							<button
								onClick={approveHandler}
								type="submit"
								value="submit"
								class="w-max rounded-md bg-green-500 text-white text-sm p-3 px-10 h-max">
								Approve
							</button>
						</div>

						<button
							type="button"
							onClick={() => setShowData(false)}
							class=" text-gray-500 absolute top-5 right-5">
							<i class="bi bi-x-circle text-2xl"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShowProjectDetails;
