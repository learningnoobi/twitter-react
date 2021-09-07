import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import DropDown from "./DropDown";
import { TweetOperation } from "../SimpleComponents";
import Moment from "moment";
import { likeTweet } from "../../redux/asyncActions/TweetAsync";
import { AiFillUnlock } from "react-icons/ai";
import { BiGlobe } from "react-icons/bi";
const TweetPostCard = ({ tweet, dispatch, user }) => {
  const [selected, setSelected] = useState(null);
  const likeTweetD = (id) => {
    dispatch(likeTweet(id));
  };
  return (
    <div className="tweetCard">
      <div className="actual-tweet">
        <div>
          <FiMoreHorizontal
            data-toggle="dropdown"
            // onClick={() => setSelected(selected === tweet.id ? null : tweet.id)}
            className="dropdownIcon"
            id={`#${tweet.id}dropdown`}
            aria-haspopup="true"
            aria-expanded="false"
          />
          <DropDown
            target={`${tweet.id}dropdown`}
            tweet={tweet}
            user={user}
            tweetId={tweet.id}
          />
          {tweet.id === selected && (
            <DropDown
              target={`${tweet.id}dropdown`}
              tweet={tweet}
              user={user}
              tweetId={tweet.id}
            />
          )}
        </div>

        <span className="add-tweet-image">
          <Link to={`/${tweet.author.username}`}>
            <img
              alt="img"
              // for some reason image path is different ..
              //some have http://http://127.0.0.1:8000 while don't
              src={
                tweet.author.avatar.includes("http://")
                  ? tweet.author.avatar
                  : `http://127.0.0.1:8000${tweet.author.avatar}`
              }
              className="rounded-circle author-image"
              width="60px"
              height="60px"
            />
          </Link>
        </span>
        <Link to={`${tweet.author.username}/tweet/${tweet.id}`}>
          <div className="tweet-content">
            <span className="d-flex">
              {tweet.author.username}
              <span className="side-name">
                @ {tweet.author.username} |{Moment(tweet.created).fromNow()}
                {tweet.is_private ? <AiFillUnlock /> : <BiGlobe />}
                {tweet.isEdited && <span className="mx-2">- Edited</span>}
              </span>
            </span>

            <p className="mt-2">
              {tweet.title} {tweet.body}
            </p>
            {tweet.image && (
              <img
                alt="img"
                src={
                  tweet.image.includes("http://")
                    ? tweet.image
                    : `http://127.0.0.1:8000${tweet.image}`
                }
                className="image"
              />
            )}
          </div>
        </Link>
      </div>
      <TweetOperation
        id={tweet.id}
        liked={tweet.iliked}
        likeTweetD={likeTweetD}
        like_count={tweet.like_count}
        tweet={tweet}
        bookmark={tweet.i_bookmarked}
      />
    </div>
  );
};

export default TweetPostCard;
