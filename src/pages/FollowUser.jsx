import React ,{useEffect}from "react";
import Second from "../components/Second";
import TweetHeader from "../components/TweetComponents/tweetHeader";
import { useSelector, useDispatch } from "react-redux";
import RecommendUser from "../components/UserRelated/RecommendUser";
import { followUserList, load_more_user } from "../redux/asyncActions/UserAsync";

const FollowUser = () => {
    const dispatch = useDispatch();
  const userIn = useSelector(
    (state) => state.userReducer
  );
  const followusers = userIn.userList
  const meta =userIn.meta


  useEffect(() => {
      dispatch(followUserList())
    // dispatch(showSearchBar("no"));
  }, [])
  const loadMore = () => {
    console.log(meta?.page, meta?.next);
    if (meta.next !== null) {
      dispatch(load_more_user(meta.page + 1));
    }
}
  return (
    <Second>
      <TweetHeader headerName="Follow Users" />
  
       <div className="p-2">
       {followusers?.map((user) => (
          <RecommendUser key={user.username} user={user} />
        ))}
       </div>
       {meta?.next && <div className="mt-3 d-flex justify-content-center">
        <button onClick={loadMore} className="link-tweet">
          Load more
        </button>
      </div>}
    </Second>
  );
};

export default FollowUser;
