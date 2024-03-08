import React from "react";

const SortPopup = ({setProjectList,list,setPopup}) => {
    console.log(list);
    const sortHandler = (type) => {
        if(type === "Latest"){
            const newList = [...list].sort((a, b) => b.project_id - a.project_id)
            setProjectList(newList)

        }else if(type === "Oldest"){
            const newList = [...list].sort((a, b) => a.project_id - b.project_id)
            setProjectList(newList)
        }
        else if(type === "Popular"){
            const newList = [...list].sort((a, b) => b.views - a.views)
            setProjectList(newList)
        }
        else if(type === "Downloaded"){
            const newList = [...list].sort((a, b) => b.downloads - a.downloads)
            setProjectList(newList)
        }
        setPopup(false)
    }


	return (
        
		<div
			id="sortproduct"
			className="transition ease-out duration-3000 flex w-full justify-center items-end fixed inset-0 z-50 bg-[rgba(0,0,0,0.2)]">
			<div className=" bg-white w-full rounded-t-xl relative">
				<div className="px-4 pb-5">
					<div className="border-b-2 mt-4 pb-2">
						<span className="font-medium">SORT BY</span>
					</div>
					<div className="mt-4 flex flex-col gap-5">
						<button id="Latest" className="flex gap-6" onClick={() => sortHandler("Popular")}>
                            <i class="bi bi-fire text-gray-500"></i>
							<span className="text-gray-500">Popular</span>
						</button>
						<button id="Oldest" className="flex gap-6" onClick={() => sortHandler("Latest")}>
                            <i class="bi bi-star text-gray-500"></i>
							<span className="text-gray-500">Latest</span>
						</button>
						<button
							id="Discount"
							className="flex gap-6"
							onClick={() => sortHandler("Oldest")}>
							    <i class="bi bi-card-text text-gray-500"></i>
							<span className="text-gray-500">Oldest</span>
						</button>
						
						<button id="LH" className="flex gap-6" onClick={() => sortHandler("Downloaded")}>
                            <i class="bi bi-arrow-down-circle text-gray-500"></i>
							<span className="text-gray-500">Most Downloaded</span>
						</button>
					</div>
				</div>
				<button onClick={() => setPopup(false)} className="absolute top-2 right-2">
                    <i class="bi bi-x-circle text-xl text-gray-500"></i>
				</button>
			</div>
		</div>
	);
};

export default SortPopup;
