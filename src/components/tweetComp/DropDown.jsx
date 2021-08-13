import React from "react";
import { BiUserPlus, BiEditAlt, BiBlock } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteTweet } from "../../redux/asyncActions/TweetAsync";
const DropDown = ({ tweetId }) => {
  const dispatch = useDispatch();
  const deletePost = (id) => {
    dispatch(deleteTweet(id));
  };
  return (
    <div className="dropdownMenu">
      <p>
        <BiUserPlus /> <span>Unfollow Rayon</span>
      </p>
      <p>
        <BiBlock />
        <span>Block</span>
      </p>
      <p onClick={() => deletePost(tweetId)}>
        <AiOutlineDelete color="#e0245e"/>
        <span style={{color:'#e0245e'}}>Delete Post</span>
      </p>
    </div>
  );
};

export default DropDown;
