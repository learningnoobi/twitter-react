import { getMessage, addChatRoom,moreMessage, setLoading, setMeta } from "../slices/ChatSlice";

import { axiosInstance } from "../../index";


export const getChatMessage = (username) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`chats/create/${username}/`);

    dispatch(getMessage(res.data.data));
    dispatch(setMeta(res.data.meta))
  } catch (err) {
    
  }
};

export const getRooms = (other_user) => async (dispatch) => {
  // dispatch(setLoading(true))
  try {
    if (other_user) {
      const res = await axiosInstance.post("chats/get_rooms/", {
        other_user: other_user,
      });

      dispatch(addChatRoom(res.data));
    } else {
      const res = await axiosInstance.get("chats/get_rooms/");
      dispatch(addChatRoom(res.data));
    }

    // console.log(res.data)

    // dispatch(setLoading(false))
  } catch (err) {
  
    dispatch(setLoading(false));
  }
};

export const loadMoreMessage= (nextPage) => async (dispatch) => {
 
  try {
    const res = await axiosInstance.get(nextPage);
   dispatch(moreMessage(res.data.data))
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    
  }
};