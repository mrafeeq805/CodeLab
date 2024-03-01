import { createSlice } from "@reduxjs/toolkit";

const featureSlice = createSlice({
    name : "features",
    initialState : {
        features : null
    },
    reducers : {
        addFeatures : (state,action) =>{
            state.features = action.payload
        }
    }
})

export default featureSlice.reducer

export const {addFeatures} = featureSlice.actions