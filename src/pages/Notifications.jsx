import React, { useEffect, useState } from "react";
import Second from "../components/Second";
import TweetHeader from "../components/tweetComp/tweetHeader";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useSelector, useDispatch } from "react-redux";
import {
  getNotifications,
  seenNotifications,
} from "../redux/asyncActions/NotificationAsync";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineRetweet,
  AiOutlineUser,
  AiOutlineDelete,
} from "react-icons/ai";

const Notifications = () => {
  const notifyState = useSelector((state) => state.notificationReducer);
  const loading = useSelector((state) => state.tweetReducer.isLoading);
  const notifications = notifyState.notificationList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotifications());
    dispatch(seenNotifications());
  }, [dispatch]);
  // const sendMessage = () => {
  //  if(msg){
  //   client.send(
  //       JSON.stringify({
  //         command: "like",
  //         message: msg
  //       })
  //     );
  //  }
  // };

  return (
    <Second>
      <TweetHeader headerName="Notfications" />

      {loading ? (
        <span className="d-flex justify-content-center mt-4">
          <ClipLoader color="#f44" loading={true} size={23} />
        </span>
      ) : notifications.length < 1 ? (
        <span className="d-flex justify-content-center mt-4">
          <strong className="side-icon">No New Notifications</strong>
        </span>
      ) : (
        notifications.map((list) => (
          <div key={list.id}>
            {list.notification_type === "L" && (
              <NotificationCard
                key={list.id}
                list={list}
                icon={<AiFillHeart color="rgb(235, 58, 91)" />}
                type=" loved  your tweet ."
              />
            )}
            {list.notification_type === "R" && (
              <NotificationCard
                key={list.id}
                list={list}
                icon={<AiOutlineComment color="lightblue" />}
                type=" replied  your tweet ."
              />
            )}
            {list.notification_type === "F" && (
              <NotificationCard
                key={list.id}
                list={list}
                icon={<AiOutlineUser color="lightgreen" />}
                type=" followed you"
              />
            )}
          </div>
        ))
      )}
    </Second>
  );
};

export default Notifications;

export const NotificationCard = ({ list, type, icon }) => {
  const dispatch = useDispatch();
  return (
    <div className="comment-card hover">
      <i className="icon dropdownIcon">
        <AiOutlineDelete onClick={() => dispatch(seenNotifications(list.id))} />
      </i>
      <Link to={`${list.to_user}/tweet/${list.tweet}`}>
        <div className="innerDiv">
          <strong className="icon">{icon}</strong>

          <strong className="mx-3">
            {list.from_user} {type}
          </strong>
        </div>
      </Link>
    </div>
  );
};
