import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import DevelopersLoader from "./skelton/DevelopersLoader";
import DeveloperCard from "./DeveloperCard";

const Developers = () => {
	const search = useRef(null);
  const [list,setList] = useState(null)
  const [listPer,setListPer] = useState(null)
  const searchCategory = (e) => {
    e.preventDefault()
    const list = listPer.filter(item => item.title.toLowerCase().includes(search.current.value.toLowerCase()))
    setList(list)
  }
	useEffect(() => {
        axios.get('/getdevelopers')
        .then(({data}) => {
            setList(data)
            setListPer(data)
        })
    },[])
	return (
		<div className="mt-16">
			<Navbar title={"Developers"} />
			<div className="p-2 my-2">
				<div className="rounded-lg border-2 p-2 px-4 ">
					<form className="flex justify-between" onSubmit={searchCategory}>
						<input
							ref={search}
							type="text"
							className="w-full outline-none"
							placeholder="Search Developers..."
						/>
						<button className="bi bi-search text-gray-500"></button>
					</form>
				</div>
			</div>
			<div className="px-2 ">
			{!list && <DevelopersLoader/>}
			<div className="mt-3 grid grid-cols-5 gap-3">
				{list?.map((item) => (
					<DeveloperCard name={item.title} avatar={item.avatar} id={item.publisher_id} />
				))}
			</div>
		</div>
		</div>
	);
};

export default Developers;
