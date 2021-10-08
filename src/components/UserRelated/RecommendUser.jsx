import React from "react";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { userFollow } from "../../redux/asyncActions/UserAsync";
const RecommendUser = ({ user }) => {
  const dispatch = useDispatch();

  return (
   
      <span className="position-relative hover trendlist">
         <Link className="d-flex"  to={`/${user.username}`}>
        <span>
          <img alt="img" src={user.avatar} className="authorImage" />
        </span>
        <span className="left-20">
        
            <p className="user-list">{user.username}</p>
       
          <span className=" side-name follow-line">
            {user.bio || "Need new bio lol "}
          </span>
        </span> </Link>
        {user.i_follow ? 
        <button
        onClick={() => dispatch(userFollow(user.username))}
        className="followbtn border-only-btn">Unfollow</button>
       : <button
       onClick={() => dispatch(userFollow(user.username))}
       className="link-tweet followbtn">Follow</button>}
      </span>
   
  );
};
export default RecommendUser
