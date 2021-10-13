import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tweets: [],
  isLoading: false,
  error: null,
  singleTweet: {},
  uploading: false,
  message: null,
  meta:null,
  bookmarksList:[]
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
    tweetMarkSuccess: (state, { payload }) => {
      state.bookmarksList = payload;
    },
    tweetFail: (state) => {
      state.error = true;
    },
    tweetUser:(state,{payload}) =>{
      const userMan = state.tweets.find((i) => i.author.username === payload.username);
      userMan.author.i_follow = payload.follow
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
    deletedMarkSuccess: (state, { payload }) => {
      state.bookmarksList = state.bookmarksList.filter((i) => i.id !== payload);
    },
    setMeta:(state, { payload }) => {
      state.meta = payload;
    },
    loadedMore:(state, { payload }) => {
      state.tweets.push(...payload);
    },
    removeMesage: (state, action) => {
      state.message = null;
    },
    showSearchBar:(state,{payload})=> {
      state.searchBar = payload;
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
  setMeta,
  tweetSuccess,
  tweetAdded,
  showSearchBar,
  tweetFail,
  loadedMore,
  deletedSuccess,
  deletedMarkSuccess,
  tweetDetail,
  setUploading,
  setMessage,
  removeMesage,
  tweetMarkSuccess,
  tweetUser,
  likeUnlikeTweet
  
} = tweetReducer.actions;
export default tweetReducer.reducer;
