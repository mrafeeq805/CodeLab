import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name : "favorite",
    initialState : {
        favoriteProjects : JSON.parse(localStorage.getItem('id')) || []
    },
    reducers : {
        addItem : (state,action) =>{
            state.favoriteProjects.push(action.payload)
            localStorage.setItem('id',JSON.stringify(state.favoriteProjects))
        },
        removeItem : (state,action) =>{
            state.favoriteProjects.splice(action.payload,1)
            localStorage.setItem('id',JSON.stringify(state.favoriteProjects))
        },
        clearAll : (state,action) =>{
            state.favoriteProjects.length = 0
            localStorage.setItem('id',JSON.stringify(state.favoriteProjects))
        }
    }
})

export default favoriteSlice.reducer

export const {addItem,removeItem,clearAll} = favoriteSlice.actions