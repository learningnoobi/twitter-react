import { axiosInstance } from "../../index";
import {
  getNotificationslice,
  setMeta,
  deletedSuccess,
  moreNotification
} from "../slices/NotificationSlice";
import { setLoading } from "../slices/userSlice";

export const getNotifications = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`notify/notification_list/`)
    dispatch(setMeta(res.data.meta));
    dispatch(getNotificationslice(res.data.data));
    dispatch(setLoading(false));
  } catch (err) {
    console.log(err);
    dispatch(setLoading(false));
  }
};

// http://127.0.0.1:8000/notify/notification_list/?page=2
export const loadMoreNotification = (pageNum) => async (dispatch) => {
 
  try {
    const res = await axiosInstance.get(`notify/notification_list/?page=${pageNum}`);
   dispatch(moreNotification(res.data.data))
    dispatch(setMeta(res.data.meta));
  } catch (err) {
    console.log(err);
  }
};


export const seenNotifications = (notify_id) => async (dispatch) => {
  try {
    if (notify_id) {
      await axiosInstance.post(`notify/notification_seen_delete/`, {
        notify_id,
      });
      dispatch(deletedSuccess(notify_id));
    } else {
      await axiosInstance.get(`notify/notification_seen_delete/`);
    }
  } catch (err) {
    console.log(err);
    dispatch(setLoading(false));
  }
};
