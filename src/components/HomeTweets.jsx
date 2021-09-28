import React, { useEffect } from "react";
import Second from "./Second";
import AddTweet from "./tweetComp/AddTweet";
import TweetCard from "./tweetComp/TweetCard";
import TweetHeader from "./tweetComp/tweetHeader";
import { useHistory } from "react-router-dom";
const HomeTweets = () => {
  const history = useHistory();
  useEffect(() => {
    window.$('[data-toggle="tooltip"]').tooltip();
    if (!localStorage.getItem("access")) {
      history.push("/login");
    }
  }, [history]);
  return (
    <Second>
      <TweetHeader headerName="Home" />
      <AddTweet />
      <TweetCard />
    </Second>
  );
};

export default HomeTweets;
