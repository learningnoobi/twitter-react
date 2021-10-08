import React, { useEffect } from "react";
import Second from "../components/Second";
import { useDispatch, useSelector } from "react-redux";
import "../styles/explore.css";
import SearchInput from "../components/SearchInput";
import ClipLoader from "react-spinners/ClipLoader";
import TweetPostCard from "../components/TweetComponents/TweetPostCard";
import { explore_tweet, load_more } from "../redux/asyncActions/TweetAsync";
import { setSearch } from "../redux/slices/NotificationSlice";
import { showSearchBar } from "../redux/slices/tweetSlice";


const Explore = () => {
  const dispatch = useDispatch();
  const userIn = useSelector((state) => state.userReducer);
  const { user } = userIn;
  const tweetsInfo = useSelector((state) => state.tweetReducer);
  const meta = tweetsInfo.meta;
  useEffect(() => {
    dispatch(explore_tweet());
    dispatch(showSearchBar("no"));
    return () => {
      dispatch(setSearch([]));
      dispatch(showSearchBar(""));
    };
  }, [dispatch]);

  const loadMore = () => {
    if (meta.next !== null) {
      dispatch(load_more(meta.next));
    }
  };
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
        {meta?.next && (
          <div className="mt-3 d-flex justify-content-center">
            <button onClick={loadMore} className="link-tweet">
              Load more
            </button>
          </div>
        )}
      </Second>
    </>
  );
};

export default Explore;
