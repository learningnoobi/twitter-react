import React, { useEffect } from "react";
import Second from "./Second";
import AddTweet from "./tweetComp/AddTweet";
import TweetCard from "./tweetComp/TweetCard";
import TweetHeader from "./tweetComp/tweetHeader";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { load_more } from "../redux/asyncActions/TweetAsync";
const HomeTweets = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweetReducer)
  const meta =tweets.meta
  useEffect(() => {
    // window.$('[data-toggle="tooltip"]').tooltip();
    if (!localStorage.getItem("access")) {
      history.push("/login");
    }
  }, [history]);

  const loadMore = () => {
    console.log("load more");
    console.log(meta?.page, meta?.next);
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

      {meta?.next && <div className="mt-3 d-flex justify-content-center">
        <button onClick={loadMore} className="link-tweet">
          Load more
        </button>
      </div>}
    </Second>
  );
};

export default HomeTweets;
