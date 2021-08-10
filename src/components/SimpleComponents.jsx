import {
    AiOutlineHeart,
    AiOutlineComment,
    AiOutlineRetweet,
  } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
export const TweetOperation = () => {
    return (
      <div className="tweet-bottom-active">
      <i className="tweetIcons">
        
        <AiOutlineComment />
      </i>
      <i className="tweetIcons">
        <AiOutlineRetweet />
      </i>
      <i className="tweetIcons">
        <AiOutlineHeart />
      </i>
      <i className="tweetIcons">
        <FiShare />
      </i>
    </div>
    )
    }