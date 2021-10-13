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
import axios from 'axios'
export const tweet_comments = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`http://127.0.0.1:8000/tweets/comments/${id}/`);
    dispatch(setLoading(false));
    dispatch(setMeta(res.data.meta));
    dispatch(commentSuccess(res.data.data));
  } catch (err) {
    // dispatch(userFail());
    console.log(err);
  }
};

export const load_more_comment = (id, nextPage) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(
      `tweets/comments/${id}/?page=${nextPage}`
    );
    console.log(res);
    dispatch(loadedMoreComment(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    console.log(err);
  }
};

export const addComment =
  (id, body, comid, reply = false) =>
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
      console.log(err);
      dispatch(commentUploading(false));
      // dispatch(setMessage("Something went Wrong !"));
    }
  };

export const delComment = (id) => async (dispatch) => {
  // http://127.0.0.1:8000/tweets/comments/2/
  try {
    await axiosInstance.delete(`tweets/comment_detail/${id}/`);
    dispatch(commentDeleted(id));
    console.log("comment id is ", id);
    dispatch(setMessage("Reply Deleted!"));
  } catch (err) {
    console.log("comment wrong id is ", id);
    console.log(err);
    dispatch(setMessage("Something went Wrong !"));
  }
};

export const likeComment = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`tweets/love/like-unlike-comment/`, {
      pk: id,
    });
    // console.log('liked Comment')
    dispatch(likeUnlikeComment({ ...res.data, id: parseInt(id) }));
  } catch (err) {
    console.log(err);
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
    console.log(err);
    dispatch(setMessage("Something went Wrong !"));
  }
};
