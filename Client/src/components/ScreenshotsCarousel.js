import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";

const ScreenshotsCarousel = ({ screenshots,setSSVisible }) => {
	const [visibility, setVisibility] = useState(true);
	return (
		<div
			
			className={!visibility ? "hidden" :"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 px-4" }>
			<div className="bg-white rounded-lg p-2 h-max w-max relative">
				<SimpleImageSlider
					width={350}
					height={200}
					images={screenshots}
					showBullets={false}
					showNavs={true}
				/>
                <button onClick={() => {
                    setSSVisible(false)
                    setVisibility(false)}}
                     className="absolute bg-gray-300 -top-4 -right-2 h-10 w-10 rounded-full">
                    <i class="bi bi-x-lg"></i>
                </button>
			</div>
		</div>
	);
};
export default ScreenshotsCarousel;
