import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { profileCardDetails } from "../utils/constants";
import ProfileMenuCard from "./ProfileMenuCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Profile = () => {
	const [name, setName] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const [bio, setBio] = useState(null);
	const [cookies, removeCookie, setCookie] = useCookies([]);
	const navigate = useNavigate();
	const navigateEditProfile = () => {
		navigate("/editprofile");
	};
	useEffect(() => {
		console.log(cookies.token);
		if (!cookies.token) {
			return navigate("/login");
		}
		async function call() {
			await axios.post("/getprofile").then(({ data }) => {
				if (data?.status) {
					setName(data?.data?.name);
					setAvatar(data?.data?.avatar);
					setBio(data?.data?.bio);
				} else {
					console.log(data?.status);
					navigate("/login");
				}
			});
		}
		call();
	}, []);
	return (
		<div className="bg-slate-50 ">
			<Navbar title={"Profile"} />
			<div className="flex flex-col items-center relative h-screen">
				<div className="mt-16 py-4 flex justify-center items-center flex-col">
					<div className="border-[1px] border-primary rounded-full h-16 w-16 p-1">
						<img
							className="h-full w-full rounded-full"
							src={avatar ? avatar : "/img/dev.png"}
							alt="icon"
						/>
					</div>
					<span className=" font-medium text-center">{name}</span>
					<span className="text-gray-500 text-sm text-center">{bio}</span>
					<button
						onClick={navigateEditProfile}
						className="bg-primary p-2 px-8 mt-3 rounded-full flex items-center gap-3 justify-center">
						<i class="bi bi-pen text-white"></i>
						<span className="text-white">Edit Profile</span>
					</button>
				</div>
				<div className="bg-white rounded-lg p-4 flex flex-col gap-2 w-10/12">
					{profileCardDetails?.map((item) => (
						<ProfileMenuCard icon={item?.icon} title={item?.title} />
					))}
				</div>
				<span className="absolute text-sm text-login_light bottom-3">
					Designed By <span className="text-primary font-medium">Secure3</span>
				</span>
			</div>
		</div>
	);
};

export default Profile;
