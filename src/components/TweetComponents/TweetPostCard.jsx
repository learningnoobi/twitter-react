import React from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import DropDown from "./DropDown";
import { TweetOperation } from "../TweetOperation";
import Moment from "moment";
import { likeTweet } from "../../redux/asyncActions/TweetAsync";
import { BiGlobe } from "react-icons/bi";
import { FaLock } from "react-icons/fa";

const TweetPostCard = ({ tweet, dispatch, user }) => {
  const likeTweetD = (id) => {
    dispatch(likeTweet(id));
  };
  return (
    <div className="tweetCard">
      <div className="actual-tweet">
        <div>
          <FiMoreHorizontal
            data-toggle="dropdown"
            className="dropdownIcon"
            id={`#${tweet.id}dropdown`}
            aria-haspopup="true"
            aria-expanded="false"
          />
          <DropDown
            target={`${tweet.id}dropdown`}
            tweet={tweet}
            user={user}
            tweetId={tweet.id}
          />
        </div>
        {tweet.parent ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>
              <Link
                to={`${tweet.author.username}` || ""}
                className="mx-2 side-name"
              >
                {tweet?.author.username === user?.username
                  ? "You "
                  : tweet.author.username}{" "}
                retweeted !
              </Link>
            </strong>

            <TweetHasParentOrNot tweet={tweet.myparent} />
          </div>
        ) : (
          <TweetHasParentOrNot tweet={tweet} />
        )}
      </div>
      {tweet.parent ? (
        <TweetOperation
          liked={tweet.myparent.iliked}
          likeTweetD={likeTweetD}
          like_count={tweet.myparent.like_count}
          tweet={tweet.myparent}
          bookmark={tweet.myparent.i_bookmarked}
          id={tweet.myparent.id}
          oriId={tweet.id}
          retweet={tweet?.author.username === user?.username ? true : false}
        />
      ) : (
        <TweetOperation
          liked={tweet.iliked}
          likeTweetD={likeTweetD}
          like_count={tweet.like_count}
          tweet={tweet}
          bookmark={tweet.i_bookmarked}
          id={tweet.id}
          comment_count={tweet.comment_count}
        />
      )}
    </div>
  );
};

export default TweetPostCard;

const TweetHasParentOrNot = ({ tweet }) => {
  const url = process.env.REACT_APP_DOMAIN;
  return (
    <>
      <span className="d-flex">
        <span className="add-tweet-image ">
          <Link to={`/${tweet?.author.username}`}>
            <img
              alt="img"
              src={tweet?.author.avatar}
              className="rounded-circle author-image "
              width="60px"
              height="60px"
            />
          </Link>
        </span>

        <Link to={`${tweet?.author.username}/tweet/${tweet?.id}`}>
          <div className="tweet-content">
            <span id="hover" className="d-flex">
              {tweet?.author.username}
              <span className="side-name">
                @ {tweet?.author.nickname} |{" "}
                {Moment(tweet?.created).fromNow(true)}
                <span className="mx-2">
                  {tweet?.is_private ? <FaLock /> : <BiGlobe />}
                  {tweet?.isEdited && <span className="mx-2">- Edited</span>}
                </span>
              </span>
            </span>

            <p className="mt-2">
              {tweet?.title} {tweet?.body}
            </p>
            {tweet?.image && (
              <img alt="img" src={tweet?.image} className="image img" />
            )}
          </div>
        </Link>
      </span>
    </>
  );
};
