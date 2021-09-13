import React, { useState } from "react";
import { BiUserPlus, BiEditAlt, BiBlock } from "react-icons/bi";
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
            <BiUserPlus /> <span>Unfollow Rayon</span>
          </p>
          <p>
            <BiBlock />
            <span>Block</span>
          </p>
        </>
      )}
    </div>
  );
};

export default DropDown;
