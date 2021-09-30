import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  count: null,
  notificationList: null,
};
export const notificationReducer = createSlice({
  name: "notificationReducer",
  initialState,
  reducers: {
    tweetNotice: (state, { payload }) => {
      state.message = payload.data;
      state.count = payload.count;
    },
    removeNotice: (state, { payload }) => {
      state.message = null;
      // state.count = null
    },
    getNotificationslice: (state, { payload }) => {
      state.notificationList = payload
      state.count = payload[0].noti_count
    },
  },
});

export const { tweetNotice, removeNotice,getNotificationslice } = notificationReducer.actions;

export default notificationReducer.reducer;
