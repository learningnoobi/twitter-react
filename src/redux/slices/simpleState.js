import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    myclass : ""
}
export const changeClass = createSlice({
    name:'changeClass',
    initialState,
    reducers:{
        showSidebar:(state,action) =>{
          state.myclass = action.payload
        }

    }
})

export const { showSidebar} = changeClass.actions

export default changeClass.reducer