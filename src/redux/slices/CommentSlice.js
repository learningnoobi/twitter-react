import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  commentList: [],
  error: false,
  uploading: false,
};

const getParent = (id, comments) => {
  for (const comment of comments) {
      if ( comment.id == id ) return comment
      else {
          const gotParent = getParent(id, comment.children)
          if (gotParent) return gotParent
      }
  }
  return null
}
export const commentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    commentSuccess: (state, { payload }) => {
      state.commentList = payload;
    },
    commentAdded: (state, { payload }) => {
      state.commentList.unshift(payload);
    },
    replyAdded: (state, { payload }) => {
      const parent = getParent(payload.parentId, state.commentList)
      parent.children.unshift(payload)
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
    likeUnlikeComment:(state,{payload}) => {
      const parent = getParent(payload.id, state.commentList)
      parent.like_count = payload.count;
    }
  },
});

export const {
  setLoading,
  commentSuccess,
  commentAdded,
  commentUploading,
  commentDeleted,
  replyAdded,
  commentEdit,
  likeUnlikeComment
} = commentReducer.actions;

export default commentReducer.reducer;
