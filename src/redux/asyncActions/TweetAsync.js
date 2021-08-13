import { axiosInstance } from "../../index";
import {
  tweetSuccess,
  setLoading,
  tweetAdded,
  tweetFail,
  deletedSuccess,
  tweetDetail,
  setUploading,
  likeUnlikeTweet,
  setMessage,
} from "../slices/tweetSlice";

export const load_tweet = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const res = await axiosInstance.get("http://127.0.0.1:8000/tweets/");
    dispatch(setLoading(false));
    dispatch(tweetSuccess(res.data));
  } catch (err) {
    // dispatch(userFail());
    console.log(err);
  }
};
export const tweet_detail = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`http://127.0.0.1:8000/tweets/${id}/`);
    dispatch(setLoading(false));
    dispatch(tweetDetail(res.data));
  } catch (err) {
    // dispatch(userFail());
    console.log(err);
  }
};
export const addTweet = (uploadData) => async (dispatch) => {
  dispatch(setUploading(true));
  try {
    const res = await axiosInstance.post(`tweets/`, uploadData);

    dispatch(setUploading(false));
    dispatch(tweetAdded(res.data));
    dispatch(setMessage("Tweet Added !"));
  } catch (err) {
    dispatch(tweetFail());
    console.log(err);
    dispatch(setMessage("Something went Wrong !"));
  }
};
export const deleteTweet = (pk) => async (dispatch) => {
  try {
    await axiosInstance.delete(`tweets/${pk}/`);
    dispatch(deletedSuccess(pk));
    dispatch(setMessage("Tweet Deleted !"));
  } catch (err) {
    dispatch(tweetFail());
    console.log(err);
    dispatch(setMessage("Something went Wrong !"));
  }
};
export const editTweet = (id, title, isChecked) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.put(`tweets/${id}/`, {
      title,
      is_private: isChecked,
      isEdited: true,
    });
    dispatch(setLoading(false));
    dispatch(tweetDetail(res.data));
    dispatch(setMessage("Tweet Updated !"));
  } catch (err) {
    dispatch(tweetFail());
    console.log(err);
    dispatch(setMessage("Something went Wrong !"));
  }
};
export const likeTweet = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`tweets/love/like-unlike/`, {
      pk: id,
    });
    dispatch(likeUnlikeTweet({ ...res.data, id: parseInt(id) }));
  } catch (err) {
    console.log(err);
    dispatch(setMessage("Something went Wrong !"));
  }
};
