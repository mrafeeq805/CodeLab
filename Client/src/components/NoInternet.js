import React from "react";


const NoInternet = () => {
	return (
		<div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
			<div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
				<div className="relative">
					<div className="absolute">
						<div className="">
							<h1 className="my-2 text-gray-800 font-bold text-2xl">
								Looks like you've not connected with internet
							</h1>
							<p className="my-2 text-gray-800">
								Sorry about that! Please turn on data to get where you need
								to go.
							</p>
							
						</div>
					</div>
					
				</div>
			</div>
			<div>
				<img src={'../assets/Group.png'} alt="empty"/>
			</div>
		</div>
	);
};

export default NoInternet ;
