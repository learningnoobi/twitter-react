import React, { useEffect } from "react";
import Second from "../components/Second";
import { useDispatch, useSelector } from "react-redux";
import "../styles/explore.css";
import SearchInput from "../components/SearchInput";
import ClipLoader from "react-spinners/ClipLoader";
import TweetPostCard from "../components/tweetComp/TweetPostCard";
import { load_tweet } from "../redux/asyncActions/TweetAsync";
import { setSearch } from "../redux/slices/NotificationSlice";

const Explore = () => {
  const dispatch = useDispatch();
  const userIn = useSelector((state) => state.userReducer);
  const { user } = userIn;
  const tweetsInfo = useSelector((state) => state.tweetReducer);
  useEffect(() => {
    dispatch(load_tweet());
    return () =>{
      dispatch(setSearch([]));
    
    };
  }, [dispatch]);
  return (
    <>
      <Second>
        <SearchInput />
        {tweetsInfo && tweetsInfo.isLoading ? (
          <span className="d-flex justify-content-center mt-4">
            <ClipLoader color="#f44" loading={true} size={23} />
          </span>
        ) : (
          tweetsInfo.tweets.map((tweet) => (
            <TweetPostCard
              user={user}
              dispatch={dispatch}
              tweet={tweet}
              key={tweet.id}
            />
          ))
        )}
      </Second>
    </>
  );
};

export default Explore;
