import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  commentList: [],
  error: false,
  uploading: false,
  meta:null
};

const getParent = (id, comments) => {
  for (const comment of comments) {
    if (comment.id === id) return comment;
    else {
      const gotParent = getParent(id, comment.children);
      if (gotParent) return gotParent;
    }
  }
  return null;
};
export const commentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setMeta:(state, { payload }) => {
      state.meta = payload;
    },
    commentSuccess: (state, { payload }) => {
      state.commentList = payload;
    },
    commentAdded: (state, { payload }) => {
      state.commentList.unshift(payload);
    },
    loadedMoreComment:(state, { payload }) => {
      state.commentList.push(...payload)
    },
    replyAdded: (state, { payload }) => {
      const parent = getParent(payload.parentId, state.commentList);
      parent.children.unshift(payload);
    },
    commentEdit: (state, { payload }) => {
      const parent = getParent(payload.id, state.commentList);
      parent.body = payload.body;
    },
    commentDeleted: (state, { payload }) => {
      const parent = getParent(payload, state.commentList);
      state.commentList =  state.commentList.filter((i) => i.id !== parent.id);
    },
    commentUploading: (state, { payload }) => {
      state.uploading = payload;
    },
    likeUnlikeComment: (state, { payload }) => {
      const parent = getParent(payload.id, state.commentList);
      parent.like_count = payload.count;
    },
  },
});

export const {
  setLoading,
  loadedMoreComment,
  commentSuccess,
  commentAdded,
  commentUploading,
  commentDeleted,
  replyAdded,
  setMeta,
  commentEdit,
  likeUnlikeComment,
} = commentReducer.actions;

export default commentReducer.reducer;
