import axios from "axios";
import React, { useState } from "react";

const EditCustomer = ({email,status,setStatus,id,setShowEdit,setUserList}) => {
    const formHandler = (e) => {
		e.preventDefault()
		axios.post('/admin/updateuser',{id:id,status:status})
		.then(({data}) => {
			setShowEdit(false)
			setUserList(data)
		})
	}
	return (
		<div
			className="transition ease-out duration-3000 w-full justify-center items-center flex fixed inset-0 z-50 bg-[rgba(0,0,0,0.2)]">
			<div className="w-full ">
				<div className="w-full flex justify-center items-center ">
					<div className="bg-white w-2/5 p-6 rounded-sm mt-3 overflow-scroll relative">
						<div className="border-b-2 pb-2 w-max">
							<span className="text-xl font-semibold ">Update Customer Data</span>
						</div>
						<form onSubmit={formHandler}>
							<input
								className="border rounded-md p-2 w-full"
								type="hidden"
								name="id"
								id="edit-customer-id"
								readonly
							/>
							<div className="w-full gap-4 space-y-5 mt-4">
								
								<div className="w-full flex gap-6 justify-between">
									<label className="block my-2 text-[#00000080]" for="">
										Email
									</label>
									<input
                                        value={email}
										className="border rounded-md p-2 w-full"
										type="text"
										readonly
									/>
								</div>
								<div className="w-full flex gap-6 justify-between">
									<label className="block my-2 text-[#00000080]" for="">
										Status
									</label>
									<select
                                    o   onChange={(e) => {
                                        setStatus(e.target.value)
                                    }}
                                        value={status }
										className="border rounded-md p-2 w-full"
										>
										<option value="Active">Active</option>
										<option value="Blocked">Blocked</option>
									</select>
								</div>
							</div>

							<div className="flex justify-end mt-6">
								<button
									type="submit"
									value="submit"
									className="rounded-md bg-blue-500 text-white text-sm p-3 w-1/2">
									Update Details
								</button>
							</div>
						</form>
						<button
							type="button"
							onclick="productPopupEdit()"
							className=" material-symbols-outlined h-[30px] w-[30px] rounded-full text-gray-500 border-gray-500 border-2 absolute top-5 right-5">
							close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditCustomer;
