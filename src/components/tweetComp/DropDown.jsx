import React,{useState} from "react";
import { BiUserPlus, BiEditAlt, BiBlock } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteTweet } from "../../redux/asyncActions/TweetAsync";
const DropDown = ({ tweetId,user,tweet }) => {

  const dispatch = useDispatch();
  const deletePost = (id) => {
    dispatch(deleteTweet(id));
  };
  console.log(user)
  return (
    <div className="dropdownMenu">
      {user.username=== tweet.author.username ?null
      :<p>
      <BiUserPlus /> <span>Unfollow Rayon</span>
    </p>
      }
      <p>
        <BiBlock />
        <span>Block</span>
      </p>
      <p onClick={() => deletePost(tweetId)}>
        <AiOutlineDelete color="#e0245e" />
        <span style={{ color: "#e0245e" }}>Delete Post</span>
      </p>
    </div>

  );
};

export default DropDown;
