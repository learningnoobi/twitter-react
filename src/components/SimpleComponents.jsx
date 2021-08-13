import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineRetweet,
} from "react-icons/ai";
import { FiShare } from "react-icons/fi";

import Heart from "../GooberStyled/TwitterHeart";

export const TweetOperation = ({ liked, id, likeTweetD, like_count }) => {
  const [isclicked, setClick] = useState(null);
  useEffect(() => {
    setClick(liked);
  }, [liked]);
  return (
    <div className="tweet-bottom-active">
      <i className="tweetIcons">
        <AiOutlineComment />
      </i>
      <i className="tweetIcons">
        <AiOutlineRetweet />
      </i>
      <i className="tweetIcons heart-parent">
        <Heart
          isclicked={isclicked?1:0}
          onClick={() => {
            setClick(!isclicked);
            likeTweetD(id);
          }}
        />
        <span className="count">{like_count}</span>
      </i>
      <i className="tweetIcons">
        <FiShare />
      </i>
    </div>
  );
};
TweetOperation.propTypes = {
  liked: PropTypes.bool,
  id: PropTypes.number,
  likeTweetD: PropTypes.func,
  like_count: PropTypes.number,
};
