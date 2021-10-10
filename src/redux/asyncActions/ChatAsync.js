import { getMessage,addChatRoom ,setLoading} from "../slices/ChatSlice";

import { axiosInstance } from "../../index";
const url = "http://127.0.0.1:8000/chat/";

export const getChatMessage = (username) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`chats/create/${username}/`);

    dispatch(getMessage(res.data))
  } catch (err) {
    console.log(err);
  }
};

export const getRooms = () => async (dispatch) => {
  dispatch(setLoading(true))
  try{
    const res = await axiosInstance.get('chats/get_rooms/');
    console.log(res.data)
    dispatch(addChatRoom(res.data))
    dispatch(setLoading(false))
  }
  catch(err){
    console.log(err)
    dispatch(setLoading(false))

  }
}