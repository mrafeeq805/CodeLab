import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name : "project",
    initialState : {
        myProjects : [],
        developerProjects : null,
        latestProjects : null,
        popularProjects : null,
        topDevelopers : null,
        description : null,
        developer : null,
        searchResults : null,
        category : null
    },
    reducers : {
        addLatest : (state,action) =>{
            state.latestProjects = action.payload
        },
        addSearchResult : (state,action) =>{
            state.searchResults = action.payload
        },
        addPopular : (state,action) =>{
            state.popularProjects = action.payload
        },
        addMyProjects : (state,action) =>{
            state.myProjects = action.payload
        },
        addDeveloperProjects : (state,action) =>{
            state.developerProjects = action.payload
        },
        addTopDevelopers : (state,action) => {
            state.topDevelopers = action.payload
        },
        addDescription : (state,action) =>{
            state.description = action.payload
        },
        addCategory : (state,action) =>{
            state.category = action.payload
        },
        
    }
})

export default projectSlice.reducer

export const {addCategory,addSearchResult,addDeveloperProjects,addMyProjects,addLatest,addPopular,addTopDevelopers,addDescription} = projectSlice.actions