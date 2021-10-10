import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading:false,
    chatMessage: [],
    chatRoom:[],
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
        addChatRoom:(state,{payload})=>{
            state.chatRoom=payload
        },
        setLoading:(state,{payload})=> {
            state.isLoading= payload
        }
    }
})
export const {getMessage,addMsg,addChatRoom,setLoading} = chatReducer.actions
export default chatReducer.reducer;
