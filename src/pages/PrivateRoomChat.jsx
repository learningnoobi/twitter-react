import React from "react";
import Message from "./Message";
import { useParams } from "react-router";
import { BiSend } from "react-icons/bi";
import TweetHeader from "../components/TweetComponents/tweetHeader";
const PrivateRoomChat = () => {
  const { username } = useParams();

  return (
    <Message>
      <TweetHeader headerName={username} />
      <div className="position-relative">
        <div className="msg-div">
          <div className="msg-chat">
            <img
              src="http://127.0.0.1:8000/media/avatars/AYwXmG38_b17JNYW.jpg"
              alt="profile"
              className="authorImage"
            />
            <span className="msg-txt">This is a message</span>
          </div>
          <div className="rightby">
            <img
              src="http://127.0.0.1:8000/media/avatars/AYwXmG38_b17JNYW.jpg"
              alt="profile"
              className="authorImage"
            />
            <span className="msg-txt right">This is a message</span>
          </div>
        </div>

        <section className="bottom-input">
          <input
            type="text"
            placeholder="Start a new message"
            className="chat-input"
          />
          <span>
            <BiSend className="largeicon mx-2" />
          </span>
        </section>
      </div>
    </Message>
  );
};

export default PrivateRoomChat;
