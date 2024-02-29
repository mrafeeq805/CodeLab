import React from "react";
import Navbar from "./Navbar";
import DevInfo from "./DevInfo";
import DevProjecInfo from "./DevProjecInfo";
import MyProjects from "./MyProjects";
import TechStackSection from "./TechStackSection";

const DeveloperPage = () => {
	return (
		<div className="bg-slate-50 flex-col mt-16 ">
			<Navbar title={"Developer Name"} />
			<DevInfo/>
            <div className=" p-4 px-8">
                <p className="text-gray-500 text-sm text-center">Example : Hey everyone ! I am a designer and blogger. I am exper in HTML ,CSS and Javascript</p>
            </div>
            <DevProjecInfo/>
            <TechStackSection/>
            <MyProjects/>
            
		</div>
	);
};

export default DeveloperPage;
