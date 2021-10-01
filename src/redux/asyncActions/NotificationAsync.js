import { axiosInstance } from "../../index";
import axios from "axios";
import {
  getNotificationslice,
  deletedSuccess,
} from "../slices/NotificationSlice";
import { setLoading } from "../slices/userSlice";

export const getNotifications = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`notify/notification_list/`);

   
      dispatch(getNotificationslice(res.data));
    
    dispatch(setLoading(false));
  } catch (err) {
    console.log(err);
    dispatch(setLoading(false));
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
