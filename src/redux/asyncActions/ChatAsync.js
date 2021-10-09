import { getMessage } from "../slices/ChatSlice";
import axios from "axios";
import { axiosInstance } from "../../index";
const url = "http://127.0.0.1:8000/chat/";

export const getChatMessage = (username) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`chats/create/${username}/`);
    console.log(res.data);
    dispatch(getMessage(res.data))
  } catch (err) {
    console.log(err);
  }
};
