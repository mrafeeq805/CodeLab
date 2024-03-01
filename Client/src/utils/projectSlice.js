import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name : "features",
    initialState : {
        latestProjects : null
    },
    reducers : {
        addLatest : (state,action) =>{
            state.latestProjects = action.payload
        }
    }
})

export default projectSlice.reducer

export const {addLatest} = projectSlice.actions