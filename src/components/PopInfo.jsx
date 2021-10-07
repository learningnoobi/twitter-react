import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { userFollow } from "../redux/asyncActions/UserAsync";
import { Link } from "react-router-dom";
import { FollowInfo } from "./SmallComponent/FollowInfo";

const PopInfo = ({ tweet }) => {
  const userInfo = useSelector((state) => state.userReducer);
  const user = userInfo.user
  const state = userInfo.followState
  const followers = userInfo.followers
  const dispatch = useDispatch();

  return (
    <>
     
      {tweet?.author.username === user?.username ? 
        ""
       : 
        <button
          onClick={() => dispatch(userFollow(tweet?.author.username))}
          className="link-tweet abs-follow"
        >
          {state ?state:tweet?.author.i_follow ? "Following" : "Follow"}
        </button>
      }

      <Link to={`/${tweet?.author.username}`}>
        <img
          alt="img"
          src={
            tweet?.author.avatar.includes("http://")
              ? tweet?.author.avatar
              : `http://127.0.0.1:8000${tweet?.author.avatar}`
          }
          className="rounded-circle author-image "
          width="60px"
          height="60px"
        />
      </Link>
      <strong>{tweet?.author.username}</strong>
      <span className="side-name">@{tweet?.author.nickname}</span>
      <p className="side-name">{tweet?.author.bio}</p>
      <div className="d-flex">
        <FollowInfo number={followers?followers:tweet.author.followers} followinfo="followers" />
        <FollowInfo number={tweet.author.following} followinfo="following" />
      </div>
    </>
  );
};

export default React.memo(PopInfo);
