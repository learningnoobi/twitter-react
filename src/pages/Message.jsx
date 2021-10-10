import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TweetHeader from "../components/TweetComponents/tweetHeader";
import "../styles/chat.css";
import { Link } from "react-router-dom";
import { getRooms } from "../redux/asyncActions/ChatAsync";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";


const Message = (props) => {
  const dispatch = useDispatch();
  const chatstate = useSelector((state) => state.chatReducer);
  const chatrooms = chatstate.chatRoom;
  const me = useSelector((state) => state.userReducer.user?.username);
  useEffect(() => {
    console.log("room are ,", chatrooms);
    dispatch(getRooms());
  }, []);

  return (
    <>
      <Sidebar />
      <div className="second-div">
        <div className="search-div">
          <div className="search-inner">
            <TweetHeader headerName="Message" />
            <input
              autoComplete="off"
              type="text"
              placeholder="search for people"
              className="chat-input searchroom"
            />
          </div>
          <div className="search-result">
            {/* <Link to="/messages/w/gintoki">
             
            </Link> */}
            {chatrooms.isLoading?
          (  <span className="d-flex justify-content-center mt-4">
            <ClipLoader color="#f44" loading={true} size={23} />
          </span>)
            :
              chatrooms.map((room) => (
                <div key={room.id}>
                  <RoomResult
                    me={me}
                    res={room}
                    otheruser={
                      room?.user1?.username === me ? room.user2 : room.user1
                    }
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="message-div">{props.children}</div>
      </div>
    </>
  );
};

export default Message;

export const RoomResult = ({ res, me, otheruser }) => {
  return (
    <Link to={`/messages/w/${otheruser.username}`}>
      <div key={res.id} className="d-flex result">
        <img
          className="authorImage"
          src={`http://127.0.0.1:8000${otheruser.avatar} `}
          alt="your result"
        />

        <div className="mx-3">
          <strong>{otheruser.username} </strong>
          <p className="side-name">{res.latest_msg?.text}</p>
        </div>
      </div>
    </Link>
  );
};
