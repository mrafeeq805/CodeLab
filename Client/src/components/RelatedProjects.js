import React, { useEffect, useState } from "react";
import ProjectCardMain from "./ProjectCardMain";
import axios from "axios";
import ProjectCardMainLoader from "./skelton/ProjectCardMainLoader";
import { useParams } from "react-router-dom";
import {Bounce, ToastContainer, toast} from 'react-toastify'

const RelatedProjects = () => {
    const list = ["1",'2']
	const {category} = useParams()
	const [emptyData,setEmptyData] = useState(false)
	const [relatedProjects,setRelatedProjects] = useState([])
	useEffect(() => {
		async function call() {
			await axios.get("/api/getrelated/"+category)
			.then((res) => {
				if(res?.data.length === 0){
					setEmptyData(true)
				}else{
					setEmptyData(false)
					setRelatedProjects(res?.data);
				}
				
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
		}
		call();
	}, []);
	return (
		<div className="px-2 mt-4 mb-24 md:px-32">
			{!emptyData && (<div className="flex justify-between items-center">
				<span className=" font-medium">Related Projects</span>
				
			</div>)}
			<ToastContainer/>

			{!emptyData && (<div className="mt-3 grid md:grid-cols-3 grid-flow-row gap-2">
				{relatedProjects.length === 0 && list?.map(item => <ProjectCardMainLoader key={item}/>)}
				{relatedProjects && relatedProjects?.map((item,index) => (
					<ProjectCardMain key={index} data={item} type={'related'} />
				))}
			</div>)}
		</div>
	);
};

export default RelatedProjects;
