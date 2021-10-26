import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  count: null,
  notificationList: [],
  searchQuery:[],

};
export const notificationReducer = createSlice({
  name: "notificationReducer",
  initialState,
  reducers: {
    tweetNotice: (state, { payload }) => {
      state.message = payload.data;
      state.count = payload.count;
    },
    removeNotice: (state) => {
      state.message = null;
    },
    getNotificationslice: (state, { payload }) => {
      state.notificationList = payload.data;
      if(payload.data.length >0){
      state.count = payload.noti_count;
      }
      const msgNoti = state.notificationList.find(i=> i.notification_type==="M")
      if (msgNoti){
        state.msgNotiExist = true
      }

    },
    setMsgNoti:state => {
      state.msgNotiExist = false
    },
    setCount:(state)=> {
      state.count = null;
    },
    setMeta:(state, { payload }) => {
      state.meta = payload;
    },
    setSearch:(state, { payload }) => {
      state.searchQuery = payload;
    },
    moreNotification:(state, { payload }) => {
      state.notificationList.push(...payload)
    },
    deletedSuccess: (state, { payload }) => {
      state.notificationList = state.notificationList.filter(
        (i) => i.id !== payload
      );
    },
  },
});

export const {
  tweetNotice,
  setCount,
  deletedSuccess,
  setSearch,
  removeNotice,
  setMsgNoti,
  moreNotification,
  setMeta,
  getNotificationslice,
} = notificationReducer.actions;

export default notificationReducer.reducer;
