import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message :null,
    count:null,
}
export const notificationReducer = createSlice({
    name:'notificationReducer',
    initialState,
    reducers:{
        tweetNotice:(state,{payload}) =>{
          state.message = payload.data
          state.count = payload.count
        },
        removeNotice:(state,{payload}) =>{
            state.message =null
            // state.count = null
          }

    }
})

export const { tweetNotice,removeNotice} = notificationReducer.actions

export default notificationReducer.reducer