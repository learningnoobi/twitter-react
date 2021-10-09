import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatMessage: []
}

const chatReducer = createSlice({
    name:"chatReducer",
    initialState,
    reducers:{
        getMessage: (state,{payload})=>{
            state.chatMessage = payload
        },
        addMsg:(state,{payload})=>{
            state.chatMessage.push(payload)
        },
    }
})
export const {getMessage,addMsg} = chatReducer.actions
export default chatReducer.reducer;
