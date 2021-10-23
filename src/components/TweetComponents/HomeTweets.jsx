import React, { useEffect } from "react";
import Second from "../Second";
import AddTweet from "./AddTweet";
import TweetCard from "./TweetCard";
import TweetHeader from "./tweetHeader";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { load_more } from "../../redux/asyncActions/TweetAsync";
import { setSearch } from "../../redux/slices/NotificationSlice";
const HomeTweets = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweetReducer);
  const meta = tweets.meta;
  const access = localStorage.getItem("access")
  useEffect(() => {
    
    if (!access) {
      history.push("/login");
    }
    return () => {
      dispatch(setSearch([]));
    };
  }, [history, dispatch,access]);

  const loadMore = () => {
    if (meta.next !== null) {
      dispatch(load_more(meta.next));
    }
  };
  return (
    <Second>
      <TweetHeader headerName="Home" />
      <AddTweet />
      <TweetCard />
      {/* load more button */}

      {meta?.next && (
        <div className="mt-3 d-flex justify-content-center">
          <button onClick={loadMore} className="link-tweet">
            Load more
          </button>
        </div>
      )}
    </Second>
  );
};

export default HomeTweets;
