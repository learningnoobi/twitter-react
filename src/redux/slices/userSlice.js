import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  message:null,
  profileUser:null,
};
export const userRegister = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, { payload }) => {
      state.access = localStorage.setItem("access", payload.access);
      state.refresh = localStorage.setItem("refresh", payload.refresh);
      state.isAuthenticated = true;
    },
    refreshSuccess: (state, { payload }) => {
      state.access = localStorage.setItem("access", payload.access);
      console.log(payload.access)
      console.log("access is ",localStorage.getItem("access"))
      state.isAuthenticated = true
    },
    userSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    profileUserSuccess: (state, action) => {
      state.profileUser = action.payload;
      state.isAuthenticated = true;
    },
    followedUnfollowed:(state,action) => {
      
      state.profileUser.i_follow = action.payload.follow
      state.profileUser.followers = action.payload.followers
    },
    removeMesage:state =>{
      state.message=null
    },
    userRegisterSuccess: (state, action) => {
      state.message =
        "Successfully registered ! Please activate account from mail.";
    },
    userFail: (state, { payload }) => {
      state.user = null;
      state.error = payload;
      state.isAuthenticated = false;
    },
    authSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logMeOut: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.user = null
      state.access = null
      state.refresh = null
      state.isAuthenticated = false;
    },
  },
});

export const {
  setLoading,
  loginSuccess,
  userSuccess,
  authFail,
  userFail,
  removeMesage,
  authSuccess,
  userRegisterSuccess,
  logMeOut,
  profileUserSuccess,
  refreshSuccess,
  followedUnfollowed
} = userRegister.actions;

export default userRegister.reducer;
