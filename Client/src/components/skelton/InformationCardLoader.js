import { Skeleton } from "@mui/material";
import React from "react";

const InformationCardLoader = () => {
	const list = [1, 2, 3, 4, 5];
	return (
        <div className="flex flex-col gap-2">
            {list.map(item => <Skeleton variant="rectangle" width={340} height={45} />)}
        </div>
    )
        
};

export default InformationCardLoader;
