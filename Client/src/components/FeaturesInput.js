
import React from "react";
import RichTextEditor from "./RichTextEditor";
const FeaturesInput = () => {
    return (
        <div className="mt-2" id="editor">
             <span className="font-medium">Features</span>
            <div className="my-2">
                <RichTextEditor/>
            </div>
        </div>
    )
};

export default FeaturesInput;
