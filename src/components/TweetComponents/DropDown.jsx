import React from "react";
import { BiUserPlus, BiBlock } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteTweet } from "../../redux/asyncActions/TweetAsync";
const DropDown = ({ tweetId, user, tweet, target }) => {
  const dispatch = useDispatch();
  const deletePost = (id) => {
    dispatch(deleteTweet(id));
  };
 
  return (
    <div 
    className="dropdown-menu dropdown-menu-right dropdownMenu"
      aria-labelledby={target}>
      {user?.username === tweet.author.username ? (
        <p onClick={() => deletePost(tweetId)}>
          <AiOutlineDelete color="#e0245e" />
          <span style={{ color: "#e0245e" }}>Delete Post</span>
        </p>
      ) : (
        <>
          <p>
            <BiBlock color="#e0245e"/> <span>Not your's Boi</span>
          </p>
          
        </>
      )}
    </div>
  );
};

export default DropDown;
