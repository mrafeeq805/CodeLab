import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useCookies } from "react-cookie";

const Header = () => {
	const navigate = useNavigate();
	const [cookie, removeCookie, setCookie] = useCookies([]);
	const [logged, setLogged] = useState(true);
	const navigateFavorites = () => {
		navigate("/favorites");
	};
	const navigateProfile = () => {
		navigate("/profile");
	};
	useEffect(() => {
		console.log(cookie.token);
		if (!cookie.token || cookie.token === "undefined") {
			console.log("logged");
			return setLogged(false);
		}
	}, []);
	return (
		<div>
			<header className="flex justify-between p-2 shadow-md py-3 md:hidden">
				<div className="flex gap-2">
					<img className="h-6" src="/logo.png" alt="logo" />
					<span className="text-primary font-medium text-lg">CodeLab</span>
				</div>
				<div className="space-x-3">
					<i
						onClick={navigateFavorites}
						class="bi bi-heart text-gray-500 text-2xl"></i>
					<i
						onClick={navigateProfile}
						class="bi bi-person-circle text-2xl text-gray-500"></i>
				</div>
			</header>
			<header className="items-center bg-white shadow-md md:flex px-32 justify-between hidden">
				<div className="flex gap-2">
					<img className="h-6" src="/logo.png" alt="logo" />
					<span className="text-primary font-medium text-lg">CodeLab</span>
				</div>
				<SearchBar title={"Search Projects ..."} />

				<div className="space-x-3 flex items-center">
					<button
						onClick={() => navigate("/addproject")}
						className="p-2 rounded-md bg-primary text-white px-4">
						Submit Project
					</button>
					{!logged && (
						<div>
							<span
								onClick={() => navigate("/login")}
								className="text-lg font-medium">
								Sign In
							</span>
						</div>
					)}

					{logged && (
						<i
							onClick={navigateProfile}
							class="bi bi-person-circle text-3xl text-gray-500"></i>
					)}
				</div>
			</header>
		</div>
	);
};

export default Header;
