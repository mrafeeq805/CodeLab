import { createSlice } from "@reduxjs/toolkit";

const screenshotSlice = createSlice({
    name : "screenshot",
    initialState : {
        screenshotsList : [],
        screenshotsFormList : []
    },
    reducers : {
        addScreenshot : (state,action) =>{
            console.log(action.payload);
            state.screenshotsList.push(action.payload)
        },
        addScreenshotForm : (state,action) =>{
            state.screenshotsFormList.push(action.payload)
        },
        removeScreenshot : (state,action) =>{
            state.screenshotsList.splice(action.payload,1)
        }
    }
})

export default screenshotSlice.reducer

export const {addScreenshot, removeScreenshot,addScreenshotForm} = screenshotSlice.actions