import React from "react";
import { Link } from "react-router-dom";

const RecommendUser = ({ user }) => {
  
  return (
    <Link  to={`/${user.username}`}>
      <span className="position-relative hover trendlist">
        <span>
          <img alt="img" src={user.avatar} className="authorImage" />
        </span>
        <span className="left-20">
        
            <p className="user-list">{user.username}</p>
       
          <span className=" side-name follow-line">
            {user.bio || "Need new bio lol "}
          </span>
        </span>
        <button className="link-tweet followbtn">Follow</button>
      </span>
    </Link>
  );
};
export default RecommendUser
