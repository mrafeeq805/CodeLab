import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Demo from "./CropView";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
	const navigate = useNavigate()
	const [avatar, setAvatar] = useState(null);
	const [picked, setPicked] = useState(false);
	const [cropped, setCropped] = useState(null);
	const name = useRef(null);
	const headline = useRef(null);
	const bio = useRef(null);
	const handleForm = async (e) => {
		e.preventDefault();
			await axios
			.post("/editprofiledata", {
				name: name.current.value,
				headline: headline.current.value,
				bio: bio.current.value,
				email: "muhammedrafeeqvr805@gmail.com",
				avatar: cropped,
			})
			.then((res) => {
				if(res?.data === 'updated'){
					navigate('profile')
				}else{
					console.log(res?.data);
				}
				
			});
		
		
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
		async function call() {
			await axios
				.post("/getprofile", { email: "muhammedrafeeqvr805@gmail.com" })
				.then((res) => {
					name.current.value = res?.data[0]?.name;
					bio.current.value = res?.data[0]?.bio;
					headline.current.value = res?.data[0]?.bio;
					setAvatar(res?.data[0]?.avatar);
				});
		}
		call();
	},[]);
	return (
		<div className="mt-4 p-4">
			<form className="" onSubmit={handleForm}>
				<div className="flex justify-between items-center mb-4">
					<div className="flex flex-col">
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
								onClick={() => setAvatar(null)}
								className="border-2 rounded-md px-4 p-1 text-sm">
								Remove
							</button>
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
				<button className=" bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
					Save
				</button>
			</form>
		</div>
	);
};

export default EditProfileForm;
