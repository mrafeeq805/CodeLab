import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
    const items = [
        {
            name : "Dashboard",
            icon : "bi bi-box-seam-fill",
            path : "/admin/dashboard"
        },
        {
            name : "Projects",
            icon : "bi bi-kanban",
            path : "/admin/projects"
        },
        {
            name : "Category",
            icon : "bi bi-app-indicator",
            path : "/admin/categories"
        },
        {
            name : "Users",
            icon : "bi bi-person-circle",
            path : "/admin/users"
        }
    ]
	return (
		<div class="flex">
			<div>
				<div class="px-5 flex flex-col gap-2 bg-white h-screen">
					<form action="/admin/logout" method="post">
						<div class="flex justify-between">
							<h1 class="text-blue-500 text-3xl my-4">LOGO</h1>

							<button class="material-symbols-outlined text-red-500">
								logout
							</button>
						</div>
					</form>
                    
					{items.map ( item => (<Link
						to={item.path}
						class="flex gap-4 bg-light p-2 rounded-md items-center px-4">
						<i class={`${item.icon} text-xl text-primary`}></i>
						<span class="text-primary font-Ubuntu font-medium">
							{item.name}
						</span>
					</Link>))}

					
				</div>
			</div>
		</div>
	);
};

export default SideMenu;
