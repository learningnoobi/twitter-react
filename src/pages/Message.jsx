import React from "react";
import Sidebar from "../components/Sidebar";
import TweetHeader from "../components/TweetComponents/tweetHeader";
import "../styles/chat.css";
import { SearchResult } from "../components/SearchInput";
import { Link, useHistory } from "react-router-dom";
const res = {
  avatar:
    "http://127.0.0.1:8000/media/avatars/216607958_4665876276776014_5114674731084827933_n_SWf3HQq.jpg",
  bio: "beitc",
  username: "gintoki",
};
const Message = (props) => {
  const history = useHistory();
  return (
    <div>
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
            <Link to="/messages/w/gintoki">
              <SearchResult res={res} />
            </Link>
            <Link to="/messages/w/naruto">
              <SearchResult res={res} />
            </Link>
          </div>
        </div>

        <div className="message-div">{props.children}</div>
      </div>
    </div>
  );
};

export default Message;
