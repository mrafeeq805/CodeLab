import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";

const ScreenshotsCarousel = ({ screenshots, setSSVisible }) => {
	const [visibility, setVisibility] = useState(true);
	const [load, setLoad] = useState(false);
	const carouselRef = useRef(null);

	const scrollBy = (direction) => {
		const { offsetWidth } = carouselRef.current;
		carouselRef.current.scrollBy({
			left: direction * offsetWidth,
			behavior: "smooth",
		});
	};

	return (
		<div class="h-full bg-black bg-opacity-80 flex justify-center items-center fixed inset-0 z-50 ">
			<div
				ref={carouselRef}
				class="carousel max-w-xl flex md:w-screen md:max-w-none h-max items-center overflow-x-scroll scroll-snap snap-mandatory scroll-smooth">
				
				{screenshots?.map((item) => {
					console.log(item);
					return (
					<div class="carousel-item snap-start flex-[0_0_100%] h-max ">
						<img
							
							src={item}
							alt="1"
							class={"w-full max-h-[600px] md:w-full object-contain"}
						/>
					</div>
				)})}
			</div>

			<div class="absolute inset-y-0 left-0 flex items-center justify-start pl-4">
				<button
					onClick={() => {
						scrollBy(-1);
					}}
					class="carousel-control-prev bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 focus:outline-none">
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"></path>
					</svg>
				</button>
			</div>
			<div class="absolute inset-y-0 right-0 flex items-center justify-end pr-4">
				<button
					onClick={() => {
						scrollBy(1);
					}}
					class="carousel-control-next bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 focus:outline-none">
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"></path>
					</svg>
				</button>
			</div>
			<button
				onClick={() => {
					setSSVisible(false);
					setVisibility(false);
				}}
				className="absolute top-2 right-2 bg-white h-8 w-8 rounded-full">
				<i class="bi bi-x text-xl"></i>
			</button>
		</div>
	);
};
export default ScreenshotsCarousel;
