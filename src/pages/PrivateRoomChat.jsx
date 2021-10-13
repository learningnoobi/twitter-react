import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { useParams } from "react-router";
import { BiSend, BiUpArrowCircle } from "react-icons/bi";
import TweetHeader from "../components/TweetComponents/tweetHeader";
import Pop from '../pop.mp3'
import { useSelector, useDispatch } from "react-redux";
import {
  getChatMessage,
  loadMoreMessage,
} from "../redux/asyncActions/ChatAsync";
import { addMsg } from "../redux/slices/ChatSlice";
import ReconnectingWebSocket from "reconnecting-websocket";
import AddPicker from "../components/SmallComponent/AddPicker";
import { Link } from "react-router-dom";
const PrivateRoomChat = () => {
  const [msgInput, setMsgInput] = useState("");
  const [istyping, setIstyping] = useState(null);
  const [typingUser, setTypingUser] = useState(null);
  const { username } = useParams();
  const userIn = useSelector((state) => state.userReducer);
  const [noScroll, setNoScroll] = useState(true);
  const dispatch = useDispatch();
  let endpoint = `ws://127.0.0.1:8000/ws/chat/${username}/`;
  const me = userIn.user?.username;
  const chatState = useSelector((state) => state.chatReducer);
  const chats = chatState.chatMessage;
  const meta = chatState.meta;
  const client = new ReconnectingWebSocket(
    endpoint + "?token=" + userIn.access
  );
    const audioRef = useRef(null);
  const msgDivRef = useRef(null);

  useEffect(() => {
    client.onopen = function () {
      console.log("Chat Websoket Connected");
    };

    client.onmessage = function (event) {
      const data = JSON.parse(event.data);

      if (data.command === "private_chat") {
        dispatch(addMsg(data));
        if(audioRef.current){
          audioRef.current.play()
        }
        // msgDivRef.current.scrollTop = msgDivRef.current.scrollHeight;
        console.log(data);
      }
      if (data.command === "is_typing") {
        setTypingUser(data.user);
        setIstyping(data.text);
        timer = setTimeout(() => {
          setIstyping(null);
        }, 500);
      }
    };
    client.onclose = function () {
      console.log("WebSocket Client disconnected");
    };
  }, [dispatch]);

  useEffect(() => {
    if (noScroll) {
      msgDivRef.current.scrollTop = msgDivRef.current.scrollHeight;
    }
  }, [chats]);

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

  function loadMore() {
    if(meta?.next ){
      setNoScroll(false);
      dispatch(loadMoreMessage(meta.next));
    }

  }
  // if (meta?.next && msgDivRef.current && msgDivRef.current.scrollTop < 40) {
  //   loadMore();
  // }
  return (
    <Message>
      <TweetHeader headerName={username} />

      <div className="main-div">
        <audio ref={audioRef} src={Pop}></audio>
        <div ref={msgDivRef} id="msg-scoll" className="msg-div">
        {meta?.next && (
           
           <i  onClick={loadMore} className="largeicon center" title="load more">
           <BiUpArrowCircle />
           </i>
      
       )}
          {/* <ScrollableFeed> */}
          {chats &&
            chats
              .slice()
              .reverse() //revrsing array
              .map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg?.sender?.username === username ? "msg-chat" : "rightby"
                  }
                >
                  {msg?.sender?.username === username && (
                    <Link to={`/${msg?.sender.username}`}>
                      <img
                        src={
                          msg?.sender.avatar.includes("http://")
                            ? msg?.sender.avatar
                            : `http://127.0.0.1:8000${msg?.sender.avatar}`
                        }
                        alt="profile"
                        className="authorImage"
                      />
                    </Link>
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
            <AddPicker
              classNem="chatEmoji"
              position="up"
              setInput={setMsgInput}
            />
            <BiSend onClick={sendChat} className="largeicon mx-2" />
          </span>
        </div>
      </div>
    </Message>
  );
};

export default PrivateRoomChat;
