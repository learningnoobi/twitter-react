import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "../SearchInput";
import SideTop from "../SideTop";
import { useSelector } from "react-redux";
import RecommendUser from "../UserRelated/RecommendUser";
const TrendBar = () => {
  const userIn = useSelector((state) => state.userReducer);
  const isAuthenticated = userIn.isAuthenticated;
  const showSearch = useSelector((state) => state.tweetReducer.searchBar);
  const recommendusers = useSelector(
    (state) => state.userReducer.recommendedUser
  );
  return (
    <div className="second-trend">
      <SideTop />
      {showSearch !== "no" && <SearchInput />}
      {isAuthenticated ? (
        <div className="follow">
          <h4 className="h4-title">Who to Follow ?</h4>
          {recommendusers?.map((user) => (
            <RecommendUser key={user.username} user={user} />
          ))}
         <Link 
         to="/follow-users"> 
         <span className="side-name">
           More User</span></Link>
        </div>
      ) : (
        <div className="follow">
        <h4 className="h4-title">Please Login</h4>
      
      </div>
      )}

      <div className="d-flex justify-content-center">
        <div className="center mt-2">
          <Link to="/" className="side-name mx-2">
            Terms and services
          </Link>
          <Link to="/" className="side-name mx-2">
            Private Policy
          </Link>
          <Link to="/" className="side-name mx-2">
            Cookie Policy
          </Link>
          <Link to="/" className="side-name mx-2">
            Ads Info
          </Link>
          <Link to="/" className="side-name mx-2">
            More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendBar;
