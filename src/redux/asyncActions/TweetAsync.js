import { axiosInstance } from "../../index";
import axios from "axios";
import {
  tweetSuccess,
  setLoading,
  tweetAdded,
  tweetFail,
  deletedSuccess,
  tweetDetail,
  setUploading,
  likeUnlikeTweet,
  setMeta,
  setMessage,
  loadedMore,
} from "../slices/tweetSlice";
import { setSearch } from "../slices/NotificationSlice";

// check is localstorage for access is present or not

export const load_tweet = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    let res;
    if (localStorage.getItem("access")) {
      res = await axiosInstance.get(`tweets/`);
    } else {
      res = await axios.get(`http://127.0.0.1:8000/tweets/`);
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
      res = await axios.get(`http://127.0.0.1:8000/tweets/explore/global/`);
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
    const res = await axiosInstance.get(`tweets/${id}/`);
    dispatch(setLoading(false));
    dispatch(tweetDetail(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const bookmark_list = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`tweets/love/bookmarkList/`);
    dispatch(setLoading(false));
    dispatch(tweetSuccess(res.data));
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
    await axiosInstance.post(`tweets/post/retweet/`, { tweetId: tweetId });

    // dispatch(tweetAdded(res.data));
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
    dispatch(likeUnlikeTweet({ ...res.data, id: parseInt(id) }));
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

    res.data.bookmarked
      ? dispatch(setMessage(`Saved to Bookmark !`))
      : dispatch(setMessage(`Removed from Bookmark !`));
  } catch (err) {
    console.log(err);
    dispatch(setMessage(`Something went Wrong !`));
  }
};

// http://127.0.0.1:8000/tweets/search/custom/?search=what
export const searchTweet = (query) => async (dispatch) => {
  try {
    if (query.length > 0) {
      const res = await axiosInstance.get(
        `tweets/search/custom/?search=${query}`
      );
      dispatch(setSearch(res.data));
    } else {
      dispatch(setSearch([]));
    }
  } catch (err) {
    console.log(err);

    dispatch(setMessage(`Something went Wrong !`));
  }
};
