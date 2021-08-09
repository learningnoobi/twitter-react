import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
};
export const userRegister = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    loginSuccess: (state, { payload }) => {
      state.isAuthenticated = true;
      state.access = payload.access;
      state.refresh = payload.refresh;
    },
    userSuccess: (state, action) => {
      state.user = action.payload;
    },
    authFail: (state) => {
      state.isAuthenticated = false;
    },
    userFail: (state) => {
      state.user = null;
    },
    authSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logMeOut:state => {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  },
});

export const { setLoading, loginSuccess, userSuccess, authFail, userFail,authSuccess ,logMeOut} =
  userRegister.actions;

export default userRegister.reducer;
