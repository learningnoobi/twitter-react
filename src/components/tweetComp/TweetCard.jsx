import React, { useState, useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { load_tweet } from "../../redux/asyncActions/TweetAsync";
import TweetPostCard from "./TweetPostCard";
const TweetCard = () => {
  const tweetsInfo = useSelector((state) => state.tweetReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_tweet());
  }, []);

  console.log(tweetsInfo.tweets);

  return (
    tweetsInfo &&
    tweetsInfo.tweets.map((tweet) => <TweetPostCard tweet={tweet} />)
  );
};

export default TweetCard;
