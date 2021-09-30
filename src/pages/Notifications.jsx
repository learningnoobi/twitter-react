import React, { useEffect, useState } from "react";
import Second from "../components/Second";
import TweetHeader from "../components/tweetComp/tweetHeader";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from "../redux/asyncActions/NotificationAsync";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Notifications = () => {
  const notifyState = useSelector((state) => state.notificationReducer);
  const loading = useSelector((state) => state.tweetReducer.isLoading);
  const notifications = notifyState.notificationList;
  const dispatch = useDispatch();
  // const client = new W3CWebSocket("ws://127.0.0.1:8000/ws/home/");
  // useEffect(() => {
  //   client.onopen = function () {
  //     console.log("WebSocket Client Connected");
  //   };

  //   client.onmessage = function (event) {
  //     const data = JSON.parse(event.data);
  //     console.log(data);
  //     setGotData(data.payload.data)
  //   };

  //   client.onclose = function () {
  //     console.log("WebSocket Client disconnected");
  //   };
  // }, []);
  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);
  const sendMessage = () => {
    //  if(msg){
    //   client.send(
    //       JSON.stringify({
    //         command: "like",
    //         message: msg
    //       })
    //     );
    //  }
  };

  return (
    <Second>
      <TweetHeader headerName="Notfications" />

      {loading ? (
        <span className="d-flex justify-content-center mt-4">
          <ClipLoader color="#f44" loading={true} size={23} />
        </span>
      ) : (
        notifications &&
        notifications.map(
          (list) =>
            list.notification_type === "L" && (
              <div key={list.id} className="comment-card">
                <div className="comment-innerDiv">
                  <Link to={`${list.to_user}/tweet/${list.tweet}`}>
                    <strong>{list.from_user} loved your tweet .</strong>
                  </Link>
                </div>
              </div>
            )
        )
      )}
    </Second>
  );
};

export default Notifications;
