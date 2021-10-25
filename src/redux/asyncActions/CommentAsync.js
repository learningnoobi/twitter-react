import {
  setLoading,
  commentSuccess,
  commentAdded,
  commentEdit,
  setMeta,
  replyAdded,
  commentDeleted,
  loadedMoreComment,
  commentUploading,
  likeUnlikeComment,
} from "../slices/CommentSlice";
import { axiosInstance } from "../../index";
import { setMessage } from "../slices/tweetSlice";
import axios from "axios";
const url = process.env.REACT_APP_DOMAIN;


export const tweet_comments = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    if(localStorage.getItem("access")){
      const res = await axiosInstance.get(`${url}tweets/comments/${id}/`);
      dispatch(setLoading(false));
      dispatch(setMeta(res.data.meta));
      dispatch(commentSuccess(res.data.data));
    }
    else{
      await axios.get(`${url}tweets/comments/${id}/`);
    }
 
  } catch (err) {
    // dispatch(userFail());
  }
};

export const load_more_comment = (id, nextPage) => async (dispatch) => {
  try {
    const res = await axios.get(
      `tweets/comments/${id}/?page=${nextPage}`
    );

    dispatch(loadedMoreComment(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {}
};

export const addComment =(id, body, comid, reply = false) =>
  async (dispatch) => {
    dispatch(commentUploading(true));
    try {
      //this is for replying to a commnt
      if (reply) {
        const res = await axiosInstance.post(`tweets/comments/reply/${id}/`, {
          body,
          comId: comid,
        });
        // dispatch(tweet_comments(id))
        dispatch(commentUploading(false));
        dispatch(replyAdded(res.data));

        dispatch(setMessage("Reply Added !"));
      } else {
        //this is the parent comment not a reply
        const res = await axiosInstance.post(`tweets/comments/${id}/`, {
          body,
        });
        dispatch(commentUploading(false));
        dispatch(commentAdded(res.data));

        dispatch(setMessage("Reply Added !"));
      }
    } catch (err) {
      dispatch(commentUploading(false));
      // dispatch(setMessage("Something went Wrong !"));
    }
  };

export const delComment = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`tweets/comment_detail/${id}/`);
    dispatch(commentDeleted(id));

    dispatch(setMessage("Reply Deleted!"));
  } catch (err) {
    dispatch(setMessage("Something went Wrong !"));
  }
};

export const likeComment = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`tweets/love/like-unlike-comment/`, {
      pk: id,
    });

    dispatch(likeUnlikeComment({ ...res.data, id: parseInt(id) }));
  } catch (err) {
    dispatch(setMessage(`Something went Wrong !`));
  }
};

export const editComment = (id, body) => async (dispatch) => {
  try {
    await axiosInstance.put(`tweets/comment_detail/${id}/`, {
      body,
      isEdited: true,
    });
    dispatch(commentEdit({ id, body }));
    dispatch(setMessage("Reply Updated !"));
  } catch (err) {
    dispatch(setMessage("Something went Wrong !"));
  }
};
