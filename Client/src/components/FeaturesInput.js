
import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from "react-redux";
import { addFeatures } from "../utils/featureSlice";

const FeaturesInput = () => {
    const [value,setValue] = useState(null)
    const dispatch = useDispatch()

    const onChangeHandler = (e) =>{
        setValue(e)
        dispatch(addFeatures(e))
    }
    
    return (
        <div className="mt-2" id="editor">
             <span className="font-medium">Features</span>
            <div className="my-2">
                <ReactQuill className="" onChange={onChangeHandler} value={value}/>
            </div>
        </div>
    )
};

export default FeaturesInput;
