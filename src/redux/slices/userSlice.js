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
      state.isAuthenticated = true;
      state.access = payload.access;
      state.refresh = payload.refresh;
    },
    userSuccess: (state, action) => {
      state.user = action.payload;
    },
    profileUserSuccess: (state, action) => {
      state.profileUser = action.payload;
    },
    removeMesage:state =>{
      state.message=null
    },
    userRegisterSuccess: (state, action) => {
      state.message =
        "Successfully registered ! Please activate account from mail.";
    },
    authFail: (state) => {
      state.isAuthenticated = false;
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
  profileUserSuccess
} = userRegister.actions;

export default userRegister.reducer;
