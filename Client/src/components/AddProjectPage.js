import React, { useState } from "react";
import Navbar from "./Navbar";
import Screenshots from "./Screenshots";
import UploadThumbanail from "./UploadThumbanail";
import FeaturesInput from "./FeaturesInput";
import ZipUploader from "./ZipUploader";
import axios from "axios"
import { useSelector } from "react-redux";

const AddProjectPage = () => {
	const imglist = useSelector((store) => store?.screenshot?.screenshotsFormList);
	console.log(imglist);
	const [data,setData] = useState({
		"title":'',
		"category" : '',
		"link" : '',
		"overview" : '',
		"languages" : '',
		"db" : '',
		
	})
	const changeInput = (e) =>{
		setData({...data,[e.target.name] : e.target.value})
		setData({...data,"screenshots":imglist})
	}
	const formHandler = async (e) =>{
		e.preventDefault()
		try {
			await axios.post("/addproject", data);
		} catch (error) {
			console.log("error");
		}
	}
	return (
		<div className="mt-16">
			<Navbar title={"Add Project"} />
			<form className="px-3" onSubmit={formHandler}>
				<label className="text-login font-medium ">Title</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input className="w-full text-login_light" type="text" name="title" onChange={changeInput}/>
				</div>
                <label className="text-login font-medium ">Category</label>
				<select className="w-full border-2 rounded-lg p-2 my-2 pr-2" name="category" onClick={changeInput}>
					<option value={"React JS"}>React JS</option>
				</select>
				
				<label className="text-login font-medium">Live Link</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input className="w-full text-login_light" type="text" name="link" onChange={changeInput}/>
				</div>
                <label className="text-login font-medium">Overview</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<textarea className="w-full text-login_light min-h-24" name="overview" onChange={changeInput}/>
				</div>
                <Screenshots/>
                <UploadThumbanail/>
                <FeaturesInput/>
                <ZipUploader/>
                <label className="text-login font-medium ">Languages Used</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input className="w-full text-login_light" type="text" placeholder="Eg : HTML,Javascript" name="languages" onChange={changeInput}/>
				</div>
                <label className="text-login font-medium ">Database</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-2">
					<input className="w-full text-login_light" type="text" placeholder="Eg : MongoDB, Firebase" name="db" onChange={changeInput}/>
				</div>
                <button  className=" bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddProjectPage;
