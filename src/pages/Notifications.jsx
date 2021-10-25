import React, { useEffect } from "react";
import Second from "../components/Second";
import TweetHeader from "../components/TweetComponents/tweetHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  getNotifications,
  loadMoreNotification,
  seenNotifications,
} from "../redux/asyncActions/NotificationAsync";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineRetweet,
  AiOutlineDelete,
  AiOutlineUserAdd,
} from "react-icons/ai";

const Notifications = () => {
  const notifyState = useSelector((state) => state.notificationReducer);
  const tweetState = useSelector((state) => state.tweetReducer);
  const notifications = notifyState.notificationList;
  const meta = notifyState.meta;
  const loading = tweetState.isLoading;
  const userIn = useSelector((state) => state.userReducer);
  const isAuthenticated = userIn.isAuthenticated;

  const dispatch = useDispatch();
  useEffect(() => {
    if(isAuthenticated){
      dispatch(getNotifications());
      dispatch(seenNotifications());
    }
    
  }, [dispatch]);

  const loadMore = () => {
    console.log("load more");
    console.log(meta?.page, meta?.next);
    if (meta.next !== null) {
      dispatch(loadMoreNotification(meta.page + 1));
    }
  };
  return (
    <Second>
      <TweetHeader headerName="Notfications" />

      {loading ? (
        <span className="d-flex justify-content-center mt-4">
          <ClipLoader color="#f44" loading={true} size={23} />
        </span>
      ) : notifications.length < 1 ? (
        <span className="d-flex justify-content-center mt-4">
          <span>
            <strong className="side-icon">No Notifications</strong>
            <p className="side-name">New notifications will be added here .</p>
          </span>
        </span>
      ) : (
        notifications.map((list) => (
          <div key={list.id}>
            {list.notification_type === "L" && (
              <NotificationCard
                key={list.id}
                list={list}
                tweet={list.tweet}
                icon={<AiFillHeart color="rgb(235, 58, 91)" />}
                type=" loved  your tweet "
                link={`${list.to_user}/tweet/${list.tweet.id}`}
              />
            )}
            {list.notification_type === "R" && (
              <NotificationCard
                key={list.id}
                list={list}
                tweet={list.tweet}
                icon={<AiOutlineComment color="lightblue" />}
                type=" replied  your tweet "
                link={`${list.to_user}/tweet/${list.tweet.id}`}
              />
            )}
            {list.notification_type === "F" && (
              <NotificationCard
                key={list.id}
                list={list}
                icon={<AiOutlineUserAdd color="orange" />}
                type=" followed you"
                link={`${list.from_user.username}`}
              />
            )}
            {list.notification_type === "RT" && (
              <NotificationCard
                key={list.id}
                list={list}
                tweet={list.tweet}
                comment={list.comment}
                icon={<AiOutlineRetweet color="lightgreen" />}
                type=" retweeted your comment"
                link={`${list.to_user}/tweet/${list.tweet.id}`}
              />
            )}
            {list.notification_type === "LR" && (
              <NotificationCard
                key={list.id}
                list={list}
                comment={list.comment}
                icon={<AiFillHeart color="lightgreen" />}
                type="loved your comment"
                link={`${list.to_user}/tweet/${list.comment.tweet_id}`}
              />
            )}
          </div>
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
  );
};

export default Notifications;

export const NotificationCard = ({
  list,
  type,
  icon,
  link,
  tweet = null,
  comment = null,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="comment-card hover">
      <i className="icon dropdownIcon">
        <AiOutlineDelete onClick={() => dispatch(seenNotifications(list.id))} />
      </i>
      <Link to={link}>
        <div className="divnotice">
          <div className="innerDiv">
            <strong style={{ fontSize: 30 }}>{icon}</strong>
            <strong className="mx-3">
              <img
                className="rounded-circle author-image"
                src={list.from_user.avatar}
                alt="user avatar"
              />{" "}
              <br />
              {list.from_user.username} {type}
              <p className="side-name">
                {comment && comment.body}
                {tweet?.title}
              </p>
            </strong>{" "}
            <br />
          </div>
        </div>
      </Link>
    </div>
  );
};
