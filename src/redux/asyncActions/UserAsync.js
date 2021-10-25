import {
  setLoading,
  loginSuccess,
  userSuccess,
  refreshSuccess,
  userFail,
  loadedMoreUser,
  followList,
  recommendUser,
  userRegisterSuccess,
  followuserList,
  authSuccess,
  logMeOut,
  profileUserSuccess,
  followRecommendUser,
  followedUnfollowed,
  setMeta,
} from "../slices/userSlice";
import { setMessage } from "../slices/tweetSlice";
import axios from "axios";
import { axiosInstance } from "../../index";
const url = process.env.REACT_APP_DOMAIN;

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    try {
      const res = await axiosInstance.get(`${url}auth/users/me/`);
      dispatch(userSuccess(res.data));
    } catch (err) {
      const res = err.response.data.code;
      if (localStorage.getItem("refresh")) {
        if (res === "token_not_valid") {
          dispatch(refreshToken());
        }
      }
      dispatch(userFail());
    }
  } else {
    dispatch(userFail());
  }
};

export const refreshToken = () => async (dispatch) => {
  if (localStorage.getItem("refresh")) {
    try {
      const res = await axiosInstance.post(`${url}auth/jwt/refresh/`, {
        refresh: localStorage.getItem("refresh"),
      });
      dispatch(refreshSuccess(res.data));
    } catch (err) {
      dispatch(userFail());
    }
  } else {
    dispatch(userFail());
  }
};

export const register =
  (username, email, password, re_password) => (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${url}auth/users/`, {
        username,
        email,
        password,
        re_password,
      })
      .then((res) => {
        dispatch(userRegisterSuccess());
        dispatch(load_user());
        dispatch(setLoading(false));
      })
      .catch((err) => {
        const errcode = err.response.data;
        errcode.email && dispatch(userFail(errcode.email[0]));
        errcode.password && dispatch(userFail(errcode.password[0]));
        errcode.username && dispatch(userFail(errcode.username[0]));
        errcode.non_field_errors &&
          dispatch(userFail(errcode.non_field_errors));
        dispatch(setLoading(false));
      });
  };

export const verify = (uid, token) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.post(`${url}auth/users/activation/`, {
      uid,
      token,
    });

    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setLoading(false));
  }
};

export const userProfile = (username) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`${url}user/${username}/`);
    dispatch(setLoading(false));
    dispatch(profileUserSuccess(res.data));
  } catch (err) {
    dispatch(userFail());
    dispatch(setLoading(false));
  }
};

export const userEdit = (username, data) => async (dispatch) => {
  // dispatch(setLoading(true));
  try {
    const res = await axiosInstance.put(`user/${username}/`, data);
    dispatch(setLoading(false));
    dispatch(profileUserSuccess(res.data));
    dispatch(load_user());
    dispatch(setMessage("Succesfully Edited"));
  } catch (err) {
    dispatch(userFail());
    dispatch(setMessage("Something's wrong !"));
    dispatch(setLoading(false));
  }
};

export const userFollow = (username) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`user/me/follow_unfollow/`, {
      username: username,
    });
    dispatch(followList(username));
    dispatch(followedUnfollowed(res.data));
    dispatch(followRecommendUser(res.data));
  } catch (err) {
    dispatch(userFail());
  }
};
export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post(`${url}auth/jwt/create/`, {
      email,
      password,
    });
    dispatch(loginSuccess(res.data));
    dispatch(load_user());
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(userFail("User or password is wrong !"));
    dispatch(setLoading(false));
  }
};

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(`${url}auth/jwt/verify/`, body, config);

      if (res.data.code !== "token_not_valid") {
        dispatch(authSuccess());
      } else {
        dispatch(userFail());
      }
    } catch (err) {
      dispatch(userFail());
    }
  } else {
    dispatch(userFail());
  }
};

export const logoutAct = () => (dispatch) => {
  dispatch(logMeOut());
  // dispatch(load_user());
};

export const recommendMeUser = () => async (dispatch) => {
  // dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`${url}recommend_users/forme/`);
    dispatch(recommendUser(res.data));
  } catch (err) {
    dispatch(userFail());
    // dispatch(setLoading(false));
  }
};

export const followUserList = () => async (dispatch) => {
  // dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`${url}recommend_users/userlist/`);
    dispatch(followuserList(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    dispatch(userFail());
    // dispatch(setLoading(false));
  }
};

export const load_more_user = (pageNum) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(
      `recommend_users/userlist/?page=${pageNum}`
    );
    dispatch(loadedMoreUser(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {}
};
