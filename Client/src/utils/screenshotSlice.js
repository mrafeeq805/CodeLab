import { createSlice } from "@reduxjs/toolkit";

const screenshotSlice = createSlice({
    name : "screenshot",
    initialState : {
        screenshotsList : [],
        screenshotsFileName: []
    },
    reducers : {
        addScreenshot : (state,action) =>{
            console.log(action.payload);
            state.screenshotsList.push(action.payload)
        },
        addScreenshotFilName : (state,action) =>{
            state.screenshotsFileName.push(action.payload)
        },
        removeScreenshot : (state,action) =>{
            state.screenshotsList.splice(action.payload,1)
        }
    }
})

export default screenshotSlice.reducer

export const {addScreenshot, removeScreenshot,addScreenshotFilName} = screenshotSlice.actions