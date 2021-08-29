import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineRetweet,
} from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import {useDispatch} from 'react-redux'
import Heart from "../GooberStyled/TwitterHeart";
import { bookmarkTweet } from "../redux/asyncActions/TweetAsync";

export const TweetOperation = ({ bookmark,liked, id, likeTweetD, like_count }) => {
  const [isclicked, setClick] = useState(null);
  const dispatch = useDispatch()
  const [bookmarked, setBookmarked] = useState(null)
  useEffect(() => {
    setClick(liked);
    setBookmarked(bookmark)
  }, [liked,bookmark]);
  const onBookmark = (id) => {
    dispatch(bookmarkTweet(id))
    setBookmarked(!bookmarked)
  }
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
    
      {bookmarked ?
      <i className="tweetIcons pointer">
        <FiShare color="lightgreen"
         onClick={()=>onBookmark(id)}/>
      </i>:
      <i className="tweetIcons pointer">
       <FiShare onClick={()=>onBookmark(id)} 
       onClick={()=>onBookmark(id)}/>
    </i>
      }
    </div>
  );
};
TweetOperation.propTypes = {
  liked: PropTypes.bool,
  id: PropTypes.number,
  likeTweetD: PropTypes.func,
  like_count: PropTypes.number,
};
