import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  commentList: [],
  error: false,
};
export const commentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    commentSuccess: (state, { payload }) => {
      state.commentList = payload;
    },
    commentAdded: (state, payload) => {
      state.commentList.unshift(payload);
    },
  },
});

export const { setLoading, commentSuccess, commentAdded } =
  commentReducer.actions;

export default commentReducer.reducer;
