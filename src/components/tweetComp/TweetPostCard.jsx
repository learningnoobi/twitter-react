import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { FiMoreHorizontal,FiShare } from "react-icons/fi";
import { AiOutlineHeart,AiOutlineComment ,AiOutlineRetweet,} from "react-icons/ai";
import DropDown from "./DropDown";

const TweetPostCard = ({tweet}) => {
  const [selected, setSelected] = useState(null);
    return (
      <div className="tweetCard">
        <div key={tweet.id} className="actual-tweet">
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
          <div  className="tweet-content">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>
                {tweet.author.first_name}

                <span className="side-name">
                  @ {tweet.author.first_name}| 14 hrs
                </span>
              </span>
              <span>
                <FiMoreHorizontal
                  onClick={() =>
                    setSelected(selected === tweet.id ? null : tweet.id)
                  }
                  style={{
                    color: "gray",
                    fontSize: 23,
                    cursor: "pointer",
                  }}
                />
                {tweet.id === selected && <DropDown tweetId={tweet.id} />}
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
        <div className="tweet-bottom-active">
          <i className="tweetIcons"> <AiOutlineComment/></i>
            <i className="tweetIcons"><AiOutlineRetweet /></i>
            <i className="tweetIcons"><AiOutlineHeart /></i>
            <i className="tweetIcons"><FiShare /></i>
          </div>
        </div>
    )
}

export default TweetPostCard
