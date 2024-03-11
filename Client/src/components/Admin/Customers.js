import React, { useEffect, useRef, useState } from "react";
import SideMenu from "./SideMenu";
import UserData from "./UserData";
import axios from "axios";
import DeleteCustomer from "./DeleteCutomer";

const Customers = () => {
	const [userList, setUserList] = useState(null);
	const [userListPer, setUserListPer] = useState(null);
	const [searchType, setSearchType] = useState("Name");
	const [showDelete, setShowDelete] = useState(false);
	const [id, setId] = useState(null);
	const [email, setEmail] = useState(null);
	const search = useRef(null);
	const filterHandler = (e) => {
		const type = e.target.value;
		if (type === "Active" || type === "Blocked") {
			const list = userListPer.filter((item) => item.status === type);
			setUserList(list);
		} else {
			const list = userListPer.filter((item) => true);
			setUserList(list);
		}
	};
	const sortHandler = (e) => {
		const type = e.target.value;
		if (type === "Old") {
			const list = [...userListPer].sort(function (a, b) {
				if (a.publisher_id < b.publisher_id) {
					return -1;
				}
				if (a.publisher_id > b.publisher_id) {
					return 1;
				}
				return 0;
			});
			setUserList(list);
		} else if (type === "New") {
			const list = [...userListPer].sort(function (a, b) {
				if (a.publisher_id < b.publisher_id) {
					return 1;
				}
				if (a.publisher_id > b.publisher_id) {
					return -1;
				}
				return 0;
			});
			setUserList(list);
		} else if (type === "Ascending : Project Count") {
			const list = [...userListPer].sort((a, b) => a.project_count - b.project_count);
			setUserList(list);
		} else if (type === "Decending : Project Count") {
			const list = [...userListPer].sort((a, b) => b.project_count - a.project_count);
			setUserList(list);
		} else if (type === "Ascending : Name") {
			const list = [...userListPer].sort(function (a, b) {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 1;
				}
				return 0;
			});
			setUserList(list);
		} else if (type === "Descending : Name") {
			const list = [...userListPer].sort(function (a, b) {
				if (a.name < b.name) {
					return 1;
				}
				if (a.name > b.name) {
					return -1;
				}
				return 0;
			});
			setUserList(list);
		}else if (type === "Ascending : Email") {
			const list = [...userListPer].sort(function (a, b) {
				if (a.email < b.email) {
					return -1;
				}
				if (a.email > b.email) {
					return 1;
				}
				return 0;
			});
			setUserList(list);
		} else if (type === "Descending : Email") {
			const list = [...userListPer].sort(function (a, b) {
				if (a.email < b.email) {
					return 1;
				}
				if (a.email > b.email) {
					return -1;
				}
				return 0;
			});
			setUserList(list);
		}
		
	};
	const searchHandler = (e) => {
		e.preventDefault();
		if (searchType === "Name") {
			const list = userListPer.filter((item) =>
				item.name
					.toLowerCase()
					.includes(search.current.value.toLowerCase())
			);
			setUserList(list);
		} else{
			const list = userListPer.filter((item) =>
				item.email.toLowerCase().includes(search.current.value.toLowerCase())
			);
			setUserList(list);
		}
	};
	useEffect(() => {
		axios.get("/admin/getallusers").then(({ data }) => {
			setUserListPer(data);
			setUserList(data);
			console.log(data);
		});
	}, []);
	return (
		<div className="flex">
			<SideMenu />
			{showDelete && (
				<DeleteCustomer
					id={id}
					email={email}
					setShowDelete={setShowDelete}
					setUsersList={setUserList}
				/>
			)}
			<div className="w-full p-4">
				<div className="">
					<span className="text-3xl font-semibold ">Customers</span>
					<span className="text-xs ml-6 text-[#00000080]">
						{" "}
						{userList?.length || 0} customers found
					</span>
				</div>
				<div className="flex gap-3 justify-end">
					<div className="flex items-center ">
						<select
							onChange={sortHandler}
							className="border-2 rounded-md py-2 bg-inherit text-gray-500 px-8">
							<option className="text-gray-500" value="Filter By">
								Sort By
							</option>
							<option value="New">New</option>
							<option value="Old">Old</option>
							<option value="Ascending : Name">Ascending : Name</option>
							<option value="Descending : Name">Decending : Name</option>
							<option value="Ascending : Email">Ascending : Email</option>
							<option value="Descending : Email">Decending : Email</option>
							<option value="Ascending : Project Count">
								Ascending : Project Count
							</option>
							<option value="Decending : Project Count">
								Decending : Project Count
							</option>
						</select>
					</div>
					<div className="flex items-center ">
						<select
							onChange={filterHandler}
							className="border-2 rounded-md py-2 bg-inherit text-gray-500 px-8">
							<option className="text-gray-500" value="Filter By">
								Filter By
							</option>
							<option value="All">All</option>
							<option value="Active">Active</option>
							<option value="Blocked">Blocked</option>
						</select>
					</div>
					<div className="rounded-md bg-transparent border-gray-200 border-2 flex">
						<form className="flex" onSubmit={searchHandler}>
							<select
								onChange={() => setSearchType('Email')}
								id="customer_search_type"
								className="pl-3 bg-inherit"
								name="customer_search_type">
								<option value="name">Name</option>
								<option value="email">Email</option>
							</select>
							<input
								ref={search}
								className="bg-transparent pl-4 outline-none w-80"
								type="text"
								placeholder="Search..."
							/>
							<button
								
								className="bg-[#1a91ff] flex justify-center items-center p-2 ">
								<span className="material-symbols-outlined text-white">
									search
								</span>
							</button>
						</form>
					</div>
				</div>

				<UserData userList={userList}
					setShowDelete={setShowDelete}
					setId={setId}
					setEmail={setEmail}/>
			</div>
		</div>
	);
};

export default Customers;
