import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import DropDown from "./DropDown";
import { TweetOperation } from "../SimpleComponents";


const TweetPostCard = ({ tweet }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="tweetCard">
      <div className="actual-tweet">
        <span>
          <FiMoreHorizontal
            onClick={() => setSelected(selected === tweet.id ? null : tweet.id)}
            className="dropdownIcon"
          />
          {tweet.id === selected && <DropDown tweetId={tweet.id} />}
        </span>
        <span className="add-tweet-image">
          <Link to="/">
            <img
              alt="img"
              src={tweet.author.avatar}
              className="rounded-circle profile-image"
              width="60px"
              height="60px"
            />
          </Link>
        </span>
        <Link to={`${tweet.author.first_name}/${tweet.id}`}>
          <div className="tweet-content">
            <div>
              <span className="d-flex">
                {tweet.author.first_name}

                <span className="side-name d-flex">
                  @ {tweet.author.first_name}| 14 hrs
                </span>
              </span>
            </div>
            <p>
              {tweet.title} {tweet.body}
            </p>
            {tweet.image && (
              <img alt="img" src={tweet.image} className="image" />
            )}
          </div>
         
        </Link>
      </div>
      <TweetOperation />
    </div>
  );
};

export default TweetPostCard;
