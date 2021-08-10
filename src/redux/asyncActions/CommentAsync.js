import {setLoading,commentSuccess,commentAdded } from "../slices/CommentSlice";
import { axiosInstance } from "../../index";
import { setMessage, setUploading } from "../slices/tweetSlice";


export const tweet_comments = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(`tweets/comments/${id}/`);
      dispatch(setLoading(false));
      dispatch(commentSuccess(res.data));
      
    } catch (err) {
      // dispatch(userFail());
      console.log(err);
    }
  };
export const addComment = (id,body) => async (dispatch) => {
    dispatch(setUploading(true));
    try {
      const res = await axiosInstance.post(`tweets/comments/${id}/`,{body});
  
      dispatch(setUploading(false));
      dispatch(commentAdded(res.data));
      dispatch(setMessage("Reply Added !"));
    } catch (err) {
    
      console.log(err);
      dispatch(setMessage("Something went Wrong !"));
    }
  };