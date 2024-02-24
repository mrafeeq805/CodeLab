import React from "react";
import DomainCard from "./DomainCard";

const CategoriesSection = () => {
	const list = ["1", "2", "3", "1", "3", "3"];
	return (
		<div className="px-2">
			<div className="mt-3 grid grid-cols-5 gap-3">
				{list.map((item) => (
					<DomainCard name={"Akshay"} img={"/img/dev.png"} />
				))}
			</div>
		</div>
	);
};

export default CategoriesSection;
