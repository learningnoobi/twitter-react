import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tweets: [],
  isLoading: false,
  error: null,
  singleTweet: {},
  uploading: false,
  message: null,
};
export const tweetReducer = createSlice({
  name: "tweetReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setUploading: (state, action) => {
      state.uploading = action.payload;
      state.error = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    tweetSuccess: (state, { payload }) => {
      state.tweets = payload;
    },
    tweetFail: (state) => {
      state.error = true;
    },
    tweetAdded: (state, { payload }) => {
      state.tweets.unshift(payload);
    },
    tweetDetail: (state, { payload }) => {
      state.singleTweet = payload;
    },
    deletedSuccess: (state, { payload }) => {
      state.tweets = state.tweets.filter((i) => i.id !== payload);
    },
    removeMesage: (state, action) => {
      state.message = null;
    },
    likeUnlikeTweet:(state,{payload}) => {
      const tweet = state.tweets.find((i) => i.id === payload.id);
      if (tweet) tweet.like_count = payload.count;
      state.singleTweet.like_count=payload.count
    }
  },
});

export const {
  setLoading,
  tweetSuccess,
  tweetAdded,
  tweetFail,
  deletedSuccess,
  tweetDetail,
  setUploading,
  setMessage,
  removeMesage,
  likeUnlikeTweet
  
} = tweetReducer.actions;
export default tweetReducer.reducer;
