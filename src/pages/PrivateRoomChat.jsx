import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useParams } from "react-router";
import { BiSend } from "react-icons/bi";
import TweetHeader from "../components/TweetComponents/tweetHeader";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useSelector, useDispatch } from "react-redux";
import { getChatMessage } from "../redux/asyncActions/ChatAsync";
import { addMsg } from "../redux/slices/ChatSlice";
import ReconnectingWebSocket from 'reconnecting-websocket';

const PrivateRoomChat = () => {
  const [msgInput, setMsgInput] = useState("");
  const [istyping, setIstyping] = useState(false);
  const { username } = useParams();
  const userIn = useSelector((state) => state.userReducer);
  // const me = userIn.user.username;
  const dispatch = useDispatch();
  let endpoint = `ws://127.0.0.1:8000/ws/chat/${username}/`;
const me = userIn.user?.username
  const chats = useSelector((state) => state.chatReducer.chatMessage);
  const client = new ReconnectingWebSocket(endpoint + "?token=" + userIn.access);

  useEffect(() => {
    client.onopen = function () {
      console.log("Chat Websoket Connected");
    };

    client.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log(data);
      dispatch(addMsg(data));
    };
    client.onclose = function () {
      console.log("WebSocket Client disconnected");
    };
  }, [dispatch]);
  const EnterKey = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      if (msgInput.length !== 0) {
        sendChat(e);
      }
    }
  };

  useEffect(() => {
    dispatch(getChatMessage(username));
  }, []);
  const sendChat = (e) => {
    e.preventDefault();
    client.send(
      JSON.stringify({
        command: "private_chat",
        message: msgInput,
        username:me,
      })
    );
    setMsgInput("");
  };
  return (
    <Message>
      <TweetHeader headerName={username} />
      <div className="main-div">
        <div className="msg-div">
          {chats &&
            chats.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg?.sender.username === username ? "msg-chat" : "rightby"
                }
              >
                {msg?.sender.username === username && (
                  <img
                    src={
                      msg?.sender.avatar.includes("http://")
                        ? msg?.sender.avatar
                        : `http://127.0.0.1:8000${msg?.sender.avatar}`
                    }
                    alt="profile"
                    className="authorImage"
                  />
                )}

                <span
                  className={
                    msg.sender.username === username
                      ? "msg-txt"
                      : "msg-txt right"
                  }
                >
                  {msg.text}
                </span>
              </div>
            ))}
        </div>

        <div className="bottom-input">
          <input
            type="text"
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            placeholder="Start a new message"
            onKeyUp={EnterKey}
            className="chat-input"
          />

          <span>
            <BiSend onClick={sendChat} className="largeicon mx-2" />
          </span>
        </div>
      </div>
    </Message>
  );
};

export default PrivateRoomChat;
