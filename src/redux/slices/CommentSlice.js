import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  commentList: [],
  error: false,
  uploading: false,
};
export const commentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
    commentSuccess: (state, { payload }) => {
      state.commentList = payload;
    },
    commentAdded: (state, { payload }) => {
      state.commentList.unshift(payload);
    },
    replyAdded: (state, { payload }) => {
      const comment = state.commentList.find((i) => i.id === payload.parentId);
      comment.children.unshift(payload);
    },
    commentEdit: (state, { payload }) => {
      const comment = state.commentList.find((i) => i.id === payload.id);
      if (comment) comment.body = payload.body;
    },
    commentDeleted: (state, { payload }) => {
      state.commentList = state.commentList.filter((i) => i.id !== payload);
    },
    commentUploading: (state, { payload }) => {
      state.uploading = payload;
    },
  },
});

export const {
  setLoading,
  commentSuccess,
  commentAdded,
  commentUploading,
  commentDeleted,
  replyAdded,
  commentEdit
} = commentReducer.actions;

export default commentReducer.reducer;
