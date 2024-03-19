import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import DomainCardLoader from "./skelton/DomainCardLoader";
import DomainCard from "./DomainCard";
import {Bounce, ToastContainer, toast} from 'react-toastify'
import Header from "./Header";
import Footer from "./Footer";

const Categories = () => {
	const search = useRef(null);
  const [list,setList] = useState(null)
  const [listPer,setListPer] = useState(null)
  const searchCategory = (e) => {
    e.preventDefault()
    const list = listPer.filter(item => item.title.toLowerCase().includes(search.current.value.toLowerCase()))
    setList(list)
  }
	useEffect(() => {
        axios.get('/getallcategories')
        .then(({data}) => {
            setList(data)
            setListPer(data)
        }).catch((err) => {
			toast.warn("Something went wrong !",{
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition : Bounce
				
			});
		})
    },[])
	return (
		<div className="mt-16 ">
			<Navbar title={"Categories"} />
			<ToastContainer/>
			<div className="hidden md:block">
				<Header/>
			</div>
			<div className="p-2 my-2 md:px-80 md:mt-24 md:w-9/12 md:flex md:justify-center">
				<div className="rounded-lg border-2 p-2 px-4 w-full">
					<form className="flex justify-between" onSubmit={searchCategory}>
						<input
							ref={search}
							type="text"
							className="w-full outline-none"
							placeholder="Search Categories..."
						/>
						<button className="bi bi-search text-gray-500"></button>
					</form>
				</div>
			</div>
			<div className="px-2 ">
			{!list && <DomainCardLoader/>}
			<div className="mt-3 grid grid-cols-4 gap-3 md:px-80 md:mb-24">
				{list?.map((item) => (
					<DomainCard name={item.title} img={item.icon} />
				))}
			</div>
			<div className="hidden md:block">
				<Footer/>
			</div>
		</div>
		</div>
	);
};

export default Categories;
