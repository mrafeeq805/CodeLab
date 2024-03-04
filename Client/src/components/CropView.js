import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../cropImage";

const Demo = ({ img, setPicked, setCropped }) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [rotation, setRotation] = useState(0);
	const [display, setDisplay] = useState(true);
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [croppedImage, setCroppedImage] = useState(null);
	const dogImg = img;

	const onCropComplete = (croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};
	const showCroppedImage = async () => {
		try {
			const croppedImage = await getCroppedImg(
				dogImg,
				croppedAreaPixels,
				rotation
			);
			console.log("donee", { croppedImage });
			setCroppedImage(croppedImage);
			setCropped(croppedImage);
			setDisplay(false);
			setPicked(false);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			{display && (
				<div>
					<Cropper
						style={{ containerStyle: { backgroundColor: "gray" } }}
						image={dogImg}
						crop={crop}
						rotation={rotation}
						zoom={zoom}
						cropShape="round"
						aspect={1}
						onCropChange={setCrop}
						onRotationChange={setRotation}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
					/>
					<button
						type="button"
						className="p-2 bg-white rounded-lg absolute bottom-4 right-1/3 left-1/3"
						onClick={showCroppedImage}>
						Set Image
					</button>
					<button
						type="button"
						className="p-2 bg-white rounded-full absolute top-4 right-2 h-10 w-10"
						onClick={() => {
							setDisplay(false);
							setPicked(false);
						}}>
						<i class="bi bi-x-lg"></i>
					</button>
				</div>
			)}
		</div>
	);
};
export default Demo;
