import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { tweet_detail, deleteTweet, editTweet } from "../redux/asyncActions/TweetAsync";
import Sidebar from "../components/Sidebar";
import Second from "../components/Second";
import TweetHeader from "../components/tweetComp/tweetHeader";
import { Link } from "react-router-dom";
import { FiMoreHorizontal,FiShare } from "react-icons/fi";
import { AiOutlineHeart,AiOutlineComment ,AiOutlineRetweet,} from "react-icons/ai";
// import ImageViewer from "react-simple-image-viewer";
import { BiUserPlus, BiEditAlt, BiBlock } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const TweetDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState('')
  const tweet = useSelector((state) => state.tweetReducer.singleTweet);
  const { author, id } = useParams();
  useEffect(() => {
    dispatch(tweet_detail(id));
  }, []);
  const editpost = () => {
    setEdit((prev) => !prev);
    setIsOpen(!isOpen);
    setEditTitle(tweet.title)
  };

  const sendEditPost = () => {
      dispatch(editTweet(id,editTitle))
      setEdit(false)
  }
  return (
    <div>
      <Sidebar />
      {tweet.author && (
        <Second>
          <TweetHeader headerName="Detail"/>
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

            <div className="tweet-content">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  {tweet.author.first_name}

                  <span className="side-name">
                    @ {tweet.author.first_name}| 14 hrs
                  </span>
                </span>
                <span>
                  <FiMoreHorizontal
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                      color: "gray",
                      fontSize: 23,
                      cursor: "pointer",
                    }}
                  />
                  {isOpen && (
                    <div className="dropdownMenu">
                      <p>
                        <BiUserPlus /> <span>Unfollow Rayos</span>
                      </p>
                      <p>
                        <BiBlock />
                        <span>Block</span>
                      </p>
                      <p onClick={() => dispatch(deleteTweet(tweet.id))}>
                        <AiOutlineDelete />
                        <span>Delete Post</span>
                      </p>
                      <p onClick={editpost}>
                        <BiEditAlt />
                        <span>Edit Post</span>
                      </p>
                    </div>
                  )}
                </span>
              </div>
              <p>
                {edit ? (
                  <>
                    <textarea
                     value={editTitle}  
                     onChange={e=>setEditTitle(e.target.value)}
                     className="editArea"></textarea> <br />
                    <button onClick={sendEditPost} className="btn btn-primary">Edit</button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  tweet.title
                )}
              </p>
              {tweet.image && (
                <img alt="img" src={tweet.image} className="image" />
              )}
            </div>
          </div>
          <div className="tweet-bottom-active">
          <i className="tweetIcons"> <AiOutlineComment/></i>
            <i className="tweetIcons"><AiOutlineRetweet /></i>
            <i className="tweetIcons"><AiOutlineHeart /></i>
            <i className="tweetIcons"><FiShare /></i>
          </div>
          </div>
        </Second>
      )}
    </div>
  );
};

export default TweetDetail;
