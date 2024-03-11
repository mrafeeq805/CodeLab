import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import DomainCardLoader from "./skelton/DomainCardLoader";
import DomainCard from "./DomainCard";

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
        })
    },[])
	return (
		<div className="mt-16">
			<Navbar title={"Categories"} />
			<div className="p-2 my-2">
				<div className="rounded-lg border-2 p-2 px-4 ">
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
			<div className="mt-3 grid grid-cols-5 gap-3">
				{list?.map((item) => (
					<DomainCard name={item.title} img={item.icon} />
				))}
			</div>
		</div>
		</div>
	);
};

export default Categories;
