
import axios from "axios";
import React from "react";

const DeleteCustomer = ({setShowDelete,id,setUsersList,email}) => {
	const formHandler = (e) => {
		e.preventDefault()
		axios.post('/api/admin/deleteuser',{id:id})
		.then(({data}) => {
			setShowDelete(false)
			setUsersList(data)
		})
	}
	return (
		<div
			id="delete"
			class="transition ease-out duration-3000 w-full justify-center flex items-center fixed inset-0 z-50 bg-[rgba(0,0,0,0.2)]">
			<div class="w-full flex justify-center items-center ">
				<div class="bg-white w-2/5 p-6 mt-3 relative rounded-lg">
					<div class="border-b-2 w-full pb-2 ">
						<span class="text-xl font-semibold ">Delete User</span>
					</div>
					
					<div class=" w-full mt-8">
						<span class="text-gray-500 text-lg block">
							Are you sure want to delete user{" "}
							<span id="display-id">({email})?</span>
						</span>
						<span class="text-gray-500 text-lg ">It cannot be restored</span>
					</div>

					<form onSubmit={formHandler}>
						<input id="delete-product-id" name="id" type="hidden" />

						<div class="flex justify-end mt-6 gap-8">
							<button
								type="button"
								onClick={() => setShowDelete(false)}
								class="rounded-full border-gray-300 border-[1px] text-gray-500 p-3 w-1/2">
								Cancel
							</button>
							<button
								class="rounded-full bg-red-500 text-white p-3 w-1/2">
								Delete
							</button>
						</div>
					</form>
					<button
						type="button"
						onClick={() => setShowDelete(false)}
						class="  text-gray-500  absolute top-5 right-5">
						<i class="bi bi-x-circle text-2xl"></i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteCustomer
