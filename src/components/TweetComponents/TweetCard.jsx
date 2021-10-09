import React, { useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import { useSelector, useDispatch } from "react-redux";
import { load_tweet } from "../../redux/asyncActions/TweetAsync";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import TweetPostCard from "./TweetPostCard";
// import { recommendMeUser } from "../../redux/asyncActions/UserAsync";

const TweetCard = () => {
  const tweetsInfo = useSelector((state) => state.tweetReducer);
  const userIn = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { user } = userIn;

  useEffect(() => {
    dispatch(load_tweet());

    // window.$('[data-toggle="popover"]').popover();
  }, [dispatch]);

  return (
    <>
      {!tweetsInfo.isLoading && tweetsInfo.tweets.length === 0 && (
        <div className="mt-3 d-flex justify-content-center">
          <span>
            <p className="side-name">Follow User to see their post</p> 
          <Link to="/explore">  <button className="ml-4 link-tweet">Go To Explore</button></Link>
          </span>
        </div>
      )}
      {tweetsInfo && tweetsInfo.isLoading ? (
        <span className="d-flex justify-content-center mt-4">
          <ClipLoader color="#f44" loading={true} size={23} />
        </span>
      ) : (
        tweetsInfo.tweets.map((tweet) => (
          <TweetPostCard
            user={user}
            dispatch={dispatch}
            tweet={tweet}
            key={tweet.id}
          />
        ))
      )}
    </>
  );
};

export default TweetCard;
