import {setLoading,commentSuccess,commentAdded,commentEdit ,commentDeleted,commentUploading} from "../slices/CommentSlice";
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
    dispatch(commentUploading(true));
    try {
      const res = await axiosInstance.post(`tweets/comments/${id}/`,{body});
      dispatch(commentUploading(false));
      dispatch(commentAdded(res.data));
      console.log('pyload is ' ,res.data)
      dispatch(setMessage("Reply Added !"));
    } catch (err) {
      console.log(err);
      dispatch(commentUploading(false));
      dispatch(setMessage("Something went Wrong !"));
    }
  };

  export const delComment = (id) => async (dispatch) => {
    // http://127.0.0.1:8000/tweets/comments/2/
    try {
       await axiosInstance.delete(`tweets/comment_detail/${id}/`)
      dispatch(commentDeleted(id));
      console.log('comment id is ',id)
      dispatch(setMessage("Reply Deleted!"));
    } catch (err) {
      console.log('comment wrng id is ',id)
      console.log(err);
      dispatch(setMessage("Something went Wrong !"));
    }
  };
  export const editComment = (id,body) => async (dispatch) => {
    try {
      await axiosInstance.put(`tweets/comment_detail/${id}/`,{
        body,
        isEdited:true
      });
      dispatch(commentEdit({id,body}));
      dispatch(setMessage("Reply Updated !"));
    } catch (err) {
      console.log(err);
      dispatch(setMessage("Something went Wrong !"));
    }
  };