import React from "react";

const SearchBar = ({title}) => {
	return (
		<div className="p-2 my-2">
			<div className="rounded-lg border-2 p-2 px-4 flex justify-between">
				<input type="text" placeholder={title} />
                <i class="bi bi-search text-gray-500"></i>
			</div>
		</div>
	);
};

export default SearchBar;
