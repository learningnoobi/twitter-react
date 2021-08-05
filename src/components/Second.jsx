import React from "react";
import { Link } from "react-router-dom";
import AddTweet from "./tweetComp/AddTweet";
import BottomTab from "./tweetComp/BottomTab";
import TrendBar from "./tweetComp/TrendBar";
import TweetCard from "./tweetComp/TweetCard";
import TweetHeader from "./tweetComp/tweetHeader";

const Second = () => {
  return (
    <div className="second" id="second">
      <div className="second-tweet">
        <TweetHeader />
        <AddTweet />
        <TweetCard />
      </div>

      <TrendBar />
      <BottomTab />
    </div>
  );
};

export default Second;
