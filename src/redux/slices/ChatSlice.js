import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading:false,
    chatMessage: [],
    chatRoom:[],
    meta:null
}

const chatReducer = createSlice({
    name:"chatReducer",
    initialState,
    reducers:{
        getMessage: (state,{payload})=>{
            state.chatMessage = payload
        },
        addMsg:(state,{payload})=>{
            state.chatMessage.unshift(payload)
        },
        addChatRoom:(state,{payload})=>{
            state.chatRoom=payload
        },
        setMeta:(state, { payload }) => {
            state.meta = payload;
          },
        setLoading:(state,{payload})=> {
            state.isLoading= payload
        },
        moreMessage:(state, { payload }) => {
            state.chatMessage.push(...payload)
          },
    }
})
export const {getMessage,addMsg,addChatRoom,setLoading,setMeta,moreMessage} = chatReducer.actions
export default chatReducer.reducer;
