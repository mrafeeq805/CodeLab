import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name : "project",
    initialState : {
        latestProjects : null,
        popularProjects : null,
        topDevelopers : null,
        description : null
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
        },
        addDescription : (state,action) =>{
            state.description = action.payload
        }
    }
})

export default projectSlice.reducer

export const {addLatest,addPopular,addTopDevelopers,addDescription} = projectSlice.actions