import React from "react";
import SideMenu from "./SideMenu";

const DashBoard = () => {
    const items = [
        {
            name : "Projects",
            icon : "bi bi-kanban"
        },
        {
            name : "Category",
            icon : "bi bi-app-indicator"
        },
        {
            name : "Users",
            icon : "bi bi-person-circle"
        }
    ]
	return (
		<div class="w-full flex">
            <SideMenu/>
			<div class="space-y-5">
				<div class="">
					<span class="text-3xl font-semibold ">Dashboard</span>
				</div>
				<div class="grid grid-cols-4 gap-4">
                    { items.map( item =>
					(<div class="flex bg-white p-3 gap-4 items-center">
						<div class="h-20 w-20 bg-light rounded-full flex justify-center items-center p-2">
							<div class="h-16 w-16 bg-primary rounded-full flex justify-center items-center">
                            <i class={`${item.icon} text-white text-2xl`}></i>
							</div>
						</div>
						<div class="flex flex-col">
							<span class="text-gray-500">Total {item.name}</span>
							<span class="font-bold">15</span>
						</div>
					</div>))
                    }       
					
				</div>

				

				
			</div>
		</div>
	);
};

export default DashBoard;
