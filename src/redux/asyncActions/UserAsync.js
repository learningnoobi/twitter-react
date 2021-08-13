import {  setLoading, loginSuccess, userSuccess, authFail, userFail,authSuccess ,logMeOut} from "../slices/userSlice";
import axios from 'axios'
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
      console.log(err);
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
        console.log(res);
        dispatch(load_user());
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log(err.response.data);
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

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post("http://127.0.0.1:8000/auth/jwt/create/", {
      email,
      password,
    });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    dispatch(loginSuccess(res.data));
    dispatch(setLoading(false));
  } catch (err) {
    console.log(err);
    dispatch(userFail('something is wrong'))
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
        dispatch(authFail());
      }
    } catch (err) {
      dispatch(authFail());
    }
  } else {
    dispatch(authFail());
  }
};

export const logoutAct = () => dispatch => {
  dispatch(logMeOut())
};

