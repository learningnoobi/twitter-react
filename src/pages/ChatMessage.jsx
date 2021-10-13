import React,{useState} from "react";
import Message, { RoomResult } from "./Message";
import "../styles/chat.css";
import { useDispatch, useSelector } from "react-redux";
import TweetHeader from "../components/TweetComponents/tweetHeader";
import { getRooms } from "../redux/asyncActions/ChatAsync";

const ChatMessage = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const chatstate = useSelector((state) => state.chatReducer);
  const chatrooms = chatstate.chatRoom;
  const me = useSelector((state) => state.userReducer.user?.username);
  const searchRoom = () => {
    let debouncer;
    clearTimeout(debouncer);
    debouncer = setTimeout(() => {
      dispatch(getRooms(query));
    }, 1000);
  };

  return (
    <Message>
      <div className="mt-4 div-mid">
        <div className="message-info">
          <strong>
            <h1>You don't have Message Selected .</h1>
          </strong>
          <p className="side-name">
            Choose one from your existing messages, or start a new one.
          </p>
          <button className="link-tweet">Select One</button>
        </div>
      </div>

      <div className="room-div">
        <TweetHeader headerName="Rooms" />
        <input
              autoComplete="off"
              value={query}
              onKeyUp={searchRoom}
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search for people"
              className="chat-input searchroom"
            />
        {chatrooms.map((room) => (
          <div key={room.id}>
            <RoomResult
              me={me}
              res={room}
              otheruser={room?.user1?.username === me ? room.user2 : room.user1}
            />
          </div>
        ))}
      </div>
    </Message>
  );
};

export default ChatMessage;
