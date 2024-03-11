import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/favoriteSlice";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DownloadCard = ({ id, url }) => {
	const dispatch = useDispatch();
	const favoriteHandler = () => {
		if (!favorites.includes(id)) {
			toast.success("Added to favorite projects",{
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition : Bounce
				
			});
			dispatch(addItem(id));
		} else {
			toast.info("removed from	favorite projects",{
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition : Bounce
			});
			dispatch(removeItem(id));
		}
	};
	const onDownload = async () => {
		axios.post("/download", { id: id }).then((res) => {
			console.log(res.data);
		});
	};
	const favorites = useSelector((store) => store?.favorite?.favoriteProjects);
	return (
		<div className="bg-slate-50 p-2 fixed bottom-0 w-full flex items-center justify-center gap-8 px-5 md:hidden">
			<ToastContainer
				
			/>
			<button onClick={favoriteHandler} className="mt-3">
				<i
					className={
						!favorites.includes(id)
							? "bi bi-heart text-primary text-2xl"
							: "bi bi-heart-fill text-primary text-2xl"
					}></i>
			</button>
			<a
				onClick={onDownload}
				className="w-full"
				href={"https://drive.google.com/uc?export=download&id=" + url}
				target="_blank"
				rel="noreferrer">
				<button className="bg-primary p-3 px-8 mt-3 w-full rounded-lg flex items-center gap-3 justify-center">
					<i className="bi bi-arrow-down-circle text-white"></i>
					<span className="text-white">Download Files</span>
				</button>
			</a>
		</div>
	);
};

export default DownloadCard;
