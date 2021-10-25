import { axiosInstance } from "../../index";
import axios from "axios";
import {
  tweetSuccess,
  setLoading,
  tweetAdded,
  tweetFail,
  deletedMarkSuccess,
  deletedSuccess,
  tweetDetail,
  setUploading,
  likeUnlikeTweet,
  setMeta,
  setMessage,
  tweetMarkSuccess,
  loadedMore,
} from "../slices/tweetSlice";
import { setSearch } from "../slices/NotificationSlice";
// check is localstorage for access is present or not
const url = process.env.REACT_APP_DOMAIN;
export const load_tweet = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    let res;
    if (localStorage.getItem("access")) {
      res = await axiosInstance.get(`tweets/`);
    } else {
      res = await axios.get(`${url}tweets/`);
    }

    // console.table('res is ',res.data)
    dispatch(setLoading(false));
    dispatch(tweetSuccess(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    dispatch(setLoading(false));
  }
};

export const explore_tweet = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    let res;
    if (localStorage.getItem("access")) {
      res = await axiosInstance.get(`tweets/explore/global/`);
    } else {
      res = await axios.get(`${url}tweets/explore/global/`);
    }

    // console.table('res is ',res.data)
    dispatch(setLoading(false));
    dispatch(tweetSuccess(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    dispatch(setLoading(false));
  }
};

export const load_more = (pageLink) => async (dispatch) => {
  try {
    const res = await axios.get(`${pageLink}`);
    dispatch(loadedMore(res.data.data));
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    console.log(err);
  }
};

export const tweet_detail = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    if (localStorage.getItem("access")) {
      const res = await axiosInstance.get(`${url}tweets/explore/global/${id}/`);
      dispatch(setLoading(false));
      dispatch(tweetDetail(res.data));
    }
    await axios.get(`${url}tweets/explore/global/${id}/`);
  } catch (err) {
    console.log(err);
  }
};

export const bookmark_list = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`tweets/love/bookmarkList/`);
    dispatch(setLoading(false));

    dispatch(tweetMarkSuccess(res.data));
  } catch (err) {
    console.log(err);
  }
};
// tweets of specific users
export const tweet_specific_user = (username) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`tweets/specific/${username}/`);
    dispatch(setLoading(false));
    dispatch(tweetSuccess(res.data));
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
    dispatch(setMessage(`Tweet Added !`));
  } catch (err) {
    dispatch(tweetFail());
    console.log(err.response.data);
    dispatch(setMessage(`Something went Wrong !`));
  }
};

export const reTweet = (tweetId) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`tweets/post/retweet/`, {
      tweetId: tweetId,
    });

    dispatch(tweetAdded(res.data));
    dispatch(setMessage(`Re Tweeted !`));
  } catch (err) {
    dispatch(tweetFail());
    console.log(err.response.data);
    dispatch(setMessage(err.response.data.detail));
  }
};

export const deleteTweet =
  (pk, DelRetweet = false) =>
  async (dispatch) => {
    try {
      await axiosInstance.delete(`tweets/${pk}/`);
      dispatch(deletedSuccess(pk));
      if (DelRetweet) {
        dispatch(setMessage(`Retweet Removed !`));
      } else {
        dispatch(setMessage(`Tweet Deleted !`));
      }
    } catch (err) {
      dispatch(tweetFail());
      console.log(err);
      dispatch(setMessage(`Something went Wrong !`));
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
    dispatch(setMessage(`Tweet Updated !`));
  } catch (err) {
    dispatch(tweetFail());
    console.log(err);
    dispatch(setMessage(`Something went Wrong !`));
  }
};
export const likeTweet = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`tweets/love/like-unlike/`, {
      pk: id,
    });
    dispatch(likeUnlikeTweet({ ...res.data, id: id }));
  } catch (err) {
    console.log(err);
    dispatch(setMessage(`Something went Wrong !`));
  }
};

export const bookmarkTweet = (id) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`tweets/love/bookmark/`, {
      pk: id,
    });

    if (res.data.bookmarked) {
      dispatch(setMessage(`Saved to Bookmark !`));
    } else {
      dispatch(setMessage(`Removed from Bookmark !`));
      dispatch(deletedMarkSuccess(id));
    }
  } catch (err) {
    console.log(err);
    dispatch(setMessage(`Something went Wrong !`));
  }
};

export const searchTweet = (query, isAuthenticated) => async (dispatch) => {
  try {
    if (query.length > 0) {
      if (isAuthenticated) {
        const res = await axiosInstance.get(
          `tweets/search/custom/?search=${query}`
        );
        dispatch(setSearch(res.data));
      } else {
        const res = await axios.get(`tweets/search/custom/?search=${query}`);
        dispatch(setSearch(res.data));
      }
    } else {
      dispatch(setSearch([]));
    }
  } catch (err) {
    console.log(err);

    dispatch(setMessage(`Something went Wrong !`));
  }
};
