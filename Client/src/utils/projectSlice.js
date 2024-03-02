import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name : "features",
    initialState : {
        latestProjects : null,
        popularProjects : null,
        topDevelopers : null,
    },
    reducers : {
        addLatest : (state,action) =>{
            state.latestProjects = action.payload
        },
        addPopular : (state,action) =>{
            state.popularProjects = action.payload
        },
        addTopDevelopers : (state,action) => {
            state.topDevelopers = action.payload
        }
    }
})

export default projectSlice.reducer

export const {addLatest,addPopular,addTopDevelopers} = projectSlice.actions