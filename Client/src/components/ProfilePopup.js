import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ProfilePopup = () => {
	const navigate = useNavigate()
	const cookie = new Cookies()
	const handleLogout = () =>{
		cookie.remove('token', { path: '/' });
		cookie.remove('email', { path: '/' });
		cookie.remove('name', { path: '/' });
		cookie.remove('avatar', { path: '/' });
		navigate('/login')
		
	  }
	return (
		<div className="absolute hidden transition-transform  p-2 bg-white border-2 right-16 top-14 rounded-md shadow-lg group-hover:block ">
	
			<div class="px-4 py-3 text-sm text-gray-900 flex gap-3">
				<div className="h-12 w-12 rounded-full border-2 border-primary p-0.5">
					<img className="h-full w-full rounded-full" src={decodeURI(cookie.get('avatar')) || '/img/dev.png'} alt="icon"/>
				</div>
				<div className="flex flex-col">
					<span>{cookie.get('name')}</span>
					<span className="text-gray-500 truncate w-36">{cookie.get('email')}</span>
				</div>
				
			</div>
			<ul
				class="py-2 text-sm text-gray-700 "
				aria-labelledby="dropdownInformationButton">
				<li className=" flex items-center hover:bg-light rounded-md pl-4 group/div1">
					<i class="bi bi-box-seam group-hover/div1:text-primary"></i>
					<Link
						to={'/myprojects'}
						class="block px-4 py-2 group-hover/div1:text-primary">
						My Projects
					</Link>
				</li>
				<li className="group flex items-center hover:bg-light rounded-md pl-4 group/div2">
					<i class="bi bi-person-fill-gear group-hover/div2:text-primary"></i>
					<Link
						to={'/editprofile'}
						class="block px-4 py-2 group-hover/div2:text-primary">
						Edit Profile
					</Link>
				</li>
				<li className="group flex items-center hover:bg-light rounded-md pl-4 group/div3">
					<i class="bi bi-telephone group-hover/div3:text-primary"></i>
					<Link
						href="#"
						class="block px-4 py-2 group-hover/div3:text-primary">
						Contact Us
					</Link>
				</li>
			</ul>
			<div class="py-2">
                    <Link
						onClick={handleLogout}
						class="block px-4 py-2 text-red-500">
						Sign Out
					</Link>
			</div>
		</div>
	);
};

export default ProfilePopup;
