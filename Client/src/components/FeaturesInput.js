
import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from "react-redux";
import { addFeatures } from "../utils/featureSlice";

const FeaturesInput = ({val}) => {
    const [value,setValue] = useState(val)

    //setValue(val)
    const dispatch = useDispatch()

    const onChangeHandler = (e) =>{
        setValue(e)
        dispatch(addFeatures(e))
    }
    
    return (
        <div className="mt-2 md:w-8/12" id="editor">
             <span className="font-medium">Features</span>
            <div className="my-2">
                <ReactQuill className="" onChange={onChangeHandler} value={value}/>
            </div>
        </div>
    )
};

export default FeaturesInput;
