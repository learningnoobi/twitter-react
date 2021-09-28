import {
  setLoading,
  loginSuccess,
  userSuccess,

  refreshSuccess,
  userFail,
  userRegisterSuccess,
  authSuccess,
  logMeOut,
  profileUserSuccess,
  followedUnfollowed,
} from "../slices/userSlice";
import { setMessage } from "../slices/tweetSlice";
import axios from "axios";
import { axiosInstance } from "../../index";
const url = "http://127.0.0.1:8000/auth/users/";

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/auth/users/me/`,
        config
      );
      dispatch(userSuccess(res.data));
    } catch (err) {
      dispatch(userFail());
      // console.log(err);
    }
  } else {
    dispatch(userFail());
    
  }
};
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.
// eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMyODExNTM
// 4LCJqdGkiOiI2MDJkNjA2ZGFhOWI0NmQ1YWYxOGZjM2E2OTY4YzhmMiIsInVzZXJfaWQiOjF9.p27cGRdn345rlRyL5TCBArzW8n0s1SzxsBQGBVA7a-A



export const refreshToken = () => async (dispatch) => {
  if (localStorage.getItem("refresh")) {
    try {
      const res = await axiosInstance.post(
        `http://127.0.0.1:8000/auth/jwt/refresh/`,
        {refresh:`JWT ${localStorage.getItem('access')}`}
      );
      dispatch(refreshSuccess(res.data));
    } catch (err) {
      dispatch(userFail());
      // console.log(err);
    }
  } else {
    dispatch(userFail());
  }
};

export const register =
  (username, email, password, re_password) => (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(url, {
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
        console.log(err.response.data);
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
    await axios.post("http://127.0.0.1:8000/auth/users/activation/", {
      uid,
      token,
    });

    dispatch(setLoading(false));
  } catch (err) {
    console.log(err);
    dispatch(setLoading(false));
  }
};



export const userProfile = (username) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(
      `http://127.0.0.1:8000/user/${username}/`
    );
    dispatch(setLoading(false));
    dispatch(profileUserSuccess(res.data));
  } catch (err) {
    dispatch(userFail());
    dispatch(setLoading(false));
    console.log(err);
  }
};

export const userEdit = (username, data) => async (dispatch) => {
  // dispatch(setLoading(true));
  try {
    const res = await axiosInstance.put(
      `user/${username}/`,
      data
    );
    dispatch(setLoading(false));
    dispatch(profileUserSuccess(res.data));
    dispatch(load_user());
    dispatch(setMessage("Succesfully Edited"));
  } catch (err) {
    dispatch(userFail());
    dispatch(setMessage("Something's wrong !"));
    dispatch(setLoading(false));
    console.log(err);
  }
};

export const userFollow = (username) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(
      `user/me/follow_unfollow/`,
      {
        username: username,
      }
    );
    dispatch(setLoading(false));
   
    dispatch(followedUnfollowed(res.data));
  } catch (err) {
    dispatch(userFail());
    console.log(err);
  }
};
export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post("http://127.0.0.1:8000/auth/jwt/create/", {
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
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/jwt/verify/",
        body,
        config
      );

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
