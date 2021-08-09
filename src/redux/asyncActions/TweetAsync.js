import axios from "axios";
import { axiosInstance } from "../../index";
import { tweetSuccess, setLoading,tweetAdded,tweetFail,deletedSuccess, tweetDetail,setUploading } from "../slices/tweetSlice";

export const load_tweet = () => async (dispatch) => {
  dispatch(setLoading(true));


  try {
    const res = await axiosInstance.get(`http://127.0.0.1:8000/tweets/`);
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
    const res = await axiosInstance.get(`http://127.0.0.1:8000/tweets/${id}`);
    dispatch(setLoading(false));
    dispatch(tweetDetail(res.data));
   
  } catch (err) {
    // dispatch(userFail());
    console.log(err);
  }
};
export const addTweet = (uploadData) => async (dispatch) => {
 
  dispatch(setUploading(true))
  try {
    const res = await axiosInstance.post(`tweets/`,
      uploadData
    );
 
    dispatch(setUploading(false))
    dispatch(tweetAdded(res.data));
    console.log('res  ',res.data)
  } catch (err) {
    dispatch(tweetFail());
    console.log(err);
  }
};
export const deleteTweet = (pk) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.delete(`tweets/${pk}/`
      
    );
    dispatch(setLoading(false));
    dispatch(deletedSuccess(pk))
    console.log('res  ',res.data)
  } catch (err) {
    dispatch(tweetFail());
    console.log(err);
  }
};
export const editTweet = (id,title) => async(dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.put(`tweets/${id}/`,
      {title}
    );
    dispatch(setLoading(false));
    dispatch(tweetDetail(res.data));
    console.log('res  ',res.data)
  } catch (err) {
    dispatch(tweetFail());
    console.log(err);
  }

}