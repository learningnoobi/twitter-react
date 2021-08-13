import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import DropDown from "./DropDown";
import { TweetOperation } from "../SimpleComponents";
import Moment from "moment";
import { likeTweet } from "../../redux/asyncActions/TweetAsync";

const TweetPostCard = ({ tweet, dispatch }) => {
  const [selected, setSelected] = useState(null);
  const likeTweetD = (id) => {
    dispatch(likeTweet(id));
  };
  return (
    <div className="tweetCard">
      <div className="actual-tweet">
        <span>
          <FiMoreHorizontal
            onClick={() => setSelected(selected === tweet.id ? null : tweet.id)}
            className="dropdownIcon"
          />
          {tweet.id === selected && <DropDown tweetId={tweet.id} />}
        </span>
        <span className="add-tweet-image">
          <Link to={`/${tweet.author.username}`}>
            <img
              alt="img"
              src={tweet.author.avatar}
              className="rounded-circle profile-image"
              width="60px"
              height="60px"
            />
          </Link>
        </span>
        <Link to={`${tweet.author.username}/${tweet.id}`}>
          <div className="tweet-content">
            <span className="d-flex">
              {tweet.author.username}
              <span className="side-name">
                @ {tweet.author.username} |{Moment(tweet.created).fromNow()}
                {tweet.isEdited && <span className="mx-2"> - Edited</span>}
              </span>
            </span>

            <p className="mt-2">
              {tweet.title} {tweet.body}
            </p>
            {tweet.image && (
              <img alt="img" src={tweet.image} className="image" />
            )}
          </div>
        </Link>
      </div>
      <TweetOperation
        id={tweet.id}
        liked={tweet.iliked}
        likeTweetD={likeTweetD}
        like_count={tweet.like_count}
      />
    </div>
  );
};

export default TweetPostCard;
