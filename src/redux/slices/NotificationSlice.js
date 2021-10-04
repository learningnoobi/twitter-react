import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  count: null,
  notificationList: [],
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
      state.notificationList = payload;
      state.count = payload[0].noti_count;
    },
    setMeta:(state, { payload }) => {
      state.meta = payload;
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
  deletedSuccess,
  removeNotice,
  moreNotification,
  setMeta,
  getNotificationslice,
} = notificationReducer.actions;

export default notificationReducer.reducer;
