import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Demo from "./CropView";
import { useNavigate } from "react-router-dom";
import FormLoading from './skelton/FormLoading'
import Cookies from "universal-cookie";
import {Bounce, ToastContainer, toast} from 'react-toastify'

const EditProfileForm = () => {
	const cookies = new Cookies()
	const navigate = useNavigate();
	const [avatar, setAvatar] = useState(null);
	const [picked, setPicked] = useState(false);
	const [cropped, setCropped] = useState(null);
	const name = useRef(null);
	const headline = useRef(null)
	const [loading,setLoading] = useState(false)
	const bio = useRef(null);
	const handleForm = async (e) => {
		e.preventDefault();
		setLoading(true)
		await axios
			.post("/api/editprofiledata", {
				name: name.current.value,
				headline: headline.current.value,
				bio: bio.current.value,
				avatar: cropped ? cropped : avatar,
			})
			.then((res) => {
				if (res?.data?.result === "updated") {
					setLoading(false)
					console.log(res?.data?.data);
					cookies.set("email", res?.data?.data?.email, { path: "/" });
					cookies.set("name", res?.data?.data?.name, { path: "/" });
					cookies.set("avatar", res?.data?.data?.avatar, { path: "/" });
					navigate("/");
				} else {
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
				}
			}).catch((err)=> {
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
	};
	const onChangeImage = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatar(reader.result);
				setPicked(true);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};
	useEffect(() => {
		if (!cookies.get('token')) {
			return navigate("/login");
		}
		async function call() {
			await axios
				.post("/api/getprofile")
				.then(({ data }) => {
					console.log(data);
					name.current.value = data?.data?.name;
					bio.current.value = data?.data?.bio;
					headline.current.value = data?.data?.bio;
					setAvatar(data?.data?.avatar);
				})
				.catch((err) => {
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
				});
		}
		call();
	}, []);
	return (
		<div className="mt-4 p-4 md:px-44 md:flex justify-center items-center">
			{loading && <FormLoading/>}
			<ToastContainer/>
			<form className="md:w-5/12" onSubmit={handleForm}>
				<div className="flex justify-between items-center mb-4">
					<div className="md:flex ">
						<div className="flex flex-col w-full">
							<span className="text-xl font-medium">Basic Information</span>
							<div className="mt-2 flex flex-col">
								<span>Profile Photo</span>
								<span className="text-gray-400 text-sm">
									Recommonded 300 * 300
								</span>
							</div>

							<div className="flex gap-3 mt-2">
								<label
									className="border-2 rounded-md px-4 p-1 text-sm"
									for={"file_inp"}>
									Change
								</label>
								<input
									onChange={onChangeImage}
									type="file"
									id="file_inp"
									className="hidden"
								/>
								<button
									type="button"
									onClick={() => setAvatar(null)}
									className="border-2 rounded-md px-4 p-1 text-sm">
									Remove
								</button>
							</div>
						</div>
						<div>

						</div>
					</div>

					<div>
						<div className="border-[1px] border-primary rounded-full h-16 w-16 p-1">
							<img
								className="h-full w-full rounded-full object-cover"
								src={avatar ? avatar : "/img/dev.png"}
								alt="icon"
							/>
						</div>
					</div>
				</div>
				{picked && (
					<Demo img={avatar} setPicked={setPicked} setCropped={setCropped} />
				)}

				<label className="text-login font-medium ">Full Name</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-3">
					<input ref={name} className="w-full text-login_light" type="text" />
				</div>
				<label className="text-login font-medium">Headline</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-3">
					<input
						ref={headline}
						className="w-full text-login_light"
						type="text"
					/>
				</div>
				<label className="text-login font-medium">Bio</label>
				<div className="border-2 rounded-lg flex justify-between p-2 my-3 h-24">
					<textarea ref={bio} className="w-full text-login_light" type="text" />
				</div>
				<div className="w-full flex justify-center">
				<button className=" bg-primary p-2 w-full md:w-max md:px-20 md:text-sm rounded-lg text-xl text-white py-3 mt-5">
					Save
				</button>
				</div>
				
			</form>
		</div>
	);
};

export default EditProfileForm;
