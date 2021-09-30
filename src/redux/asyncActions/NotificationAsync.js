import { axiosInstance } from "../../index";
import axios from "axios";
import { getNotificationslice } from "../slices/NotificationSlice";
import { setLoading } from "../slices/userSlice";

export const getNotifications = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`notify/notification_list/`);
    console.log(res.data);

    dispatch(getNotificationslice(res.data));
    dispatch(setLoading(false));
  } catch (err) {
    console.log(err);
    dispatch(setLoading(false));
  }
};
