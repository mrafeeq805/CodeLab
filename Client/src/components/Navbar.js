import React from "react";

const Navbar = ({ title }) => {
	return (
		<div>
			<div className="p-3 flex justify-between bg-gray-50 shadow-md fixed top-0 w-full z-20 md:hidden">
				<i
					onClick={() => window.history.back()}
					className="bi bi-arrow-left-circle text-2xl text-gray-400"></i>
				<span className="text-lg font-medium">{title}</span>
				<div></div>
			</div>
		</div>
	);
};

export default Navbar;
