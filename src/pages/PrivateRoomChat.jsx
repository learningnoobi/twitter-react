import React from "react";
import Message from "./Message";
import { useParams } from "react-router";
import TweetHeader from "../components/TweetComponents/tweetHeader";
const PrivateRoomChat = () => {
  const { username } = useParams();

  return (

    <Message>
     <TweetHeader headerName={username} />
    </Message>
   
  );
};

export default PrivateRoomChat;
