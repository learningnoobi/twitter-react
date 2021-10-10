import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { useParams } from "react-router";
import { BiSend } from "react-icons/bi";
import TweetHeader from "../components/TweetComponents/tweetHeader";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useSelector, useDispatch } from "react-redux";
import { getChatMessage } from "../redux/asyncActions/ChatAsync";
import { addMsg } from "../redux/slices/ChatSlice";
import ReconnectingWebSocket from "reconnecting-websocket";
import AddPicker from "../components/SmallComponent/AddPicker";

const PrivateRoomChat = () => {
  const [msgInput, setMsgInput] = useState("");
  const [istyping, setIstyping] = useState(null);
  const [typingUser, setTypingUser] = useState(null);
  const { username } = useParams();
  const userIn = useSelector((state) => state.userReducer);
  // const me = userIn.user.username;
  const dispatch = useDispatch();
  let endpoint = `ws://127.0.0.1:8000/ws/chat/${username}/`;
  const me = userIn.user?.username;
  const chats = useSelector((state) => state.chatReducer.chatMessage);
  const client = new ReconnectingWebSocket(
    endpoint + "?token=" + userIn.access
  );

  const msgDivRef = useRef(null);

  useEffect(() => {
    client.onopen = function () {
      console.log("Chat Websoket Connected");
    };

    client.onmessage = function (event) {
      const data = JSON.parse(event.data);

      if (data.command === "private_chat") {
        dispatch(addMsg(data));
        // msgDivRef.current.scrollTop = msgDivRef.current.scrollHeight;
        console.log(data);
      }
      if (data.command === "is_typing") {
        setTypingUser(data.user);
        setIstyping(data.text);
        timer = setTimeout(() => {
          setIstyping(null);
        }, 2000);
      }
    };
    client.onclose = function () {
      console.log("WebSocket Client disconnected");
    };
  }, [dispatch]);

  useEffect(()=> {
    msgDivRef.current.scrollTop = msgDivRef.current.scrollHeight;
  },[chats])

  const EnterKey = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      if (msgInput.length !== 0) {
        sendChat(e);
      }
    }
  };

  useEffect(() => {
    dispatch(getChatMessage(username));
  }, [dispatch, username]);
  const sendChat = (e) => {
    e.preventDefault();
    client.send(
      JSON.stringify({
        command: "private_chat",
        message: msgInput,
        username: me,
      })
    );
    setMsgInput("");
  };
  let timer;
  const isTyping = (e) => {
    window.clearTimeout(timer);
    client.send(
      JSON.stringify({
        command: "is_typing",
        text: `${me} is typing ...`,
        user: me,
      })
    );
  };

  return (
    <Message>
      <TweetHeader headerName={username} />

      <div className="main-div">
        <div ref={msgDivRef} id="msg-scoll" className="msg-div">
          {/* <ScrollableFeed> */}
          {chats &&
            chats.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg?.sender?.username === username ? "msg-chat" : "rightby"
                }
              >
                {msg?.sender?.username === username && (
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

                <div
                  className={
                    msg.sender?.username === username
                      ? "msg-txt"
                      : "msg-txt right"
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
          {/* </ScrollableFeed> */}
        </div>

        <div className="bottom-input">
          {typingUser !== me && (
            <span
              style={{ position: "absolute", left: 10, bottom: 50 }}
              className="ml-4"
            >
              {istyping}
            </span>
          )}
          <input
            type="text"
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            placeholder="Start a new message"
            onKeyDown={EnterKey}
            onKeyPress={isTyping}
            className="chat-input"
          />

          <span className="d-flex">
            <AddPicker classNem="chatEmoji" position="up" setInput={setMsgInput} />
            <BiSend onClick={sendChat} className="largeicon mx-2" />
          </span>
        </div>
      </div>
    </Message>
  );
};

export default PrivateRoomChat;
