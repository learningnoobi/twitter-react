import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AiOutlineComment, AiOutlineRetweet } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Heart from "../GooberStyled/TwitterHeart";
import { bookmarkTweet, deleteTweet, reTweet } from "../redux/asyncActions/TweetAsync";
import { addComment } from "../redux/asyncActions/CommentAsync";
import AddPicker from "./SmallComponent/AddPicker";

export const TweetOperation = ({
  bookmark,
  liked,
  id,
  oriId=null,
  retweet=false,
  likeTweetD,
  like_count,
  comid = null,
  reply,
}) => {
  const [isclicked, setClick] = useState(null);
  const dispatch = useDispatch();
  const [comId, setComId] = useState(null);
  const [bookmarked, setBookmarked] = useState(null);
  const [commentInput, setCommentInput] = useState();

  useEffect(() => {
    //bootstrap tooltip
    window.$('[data-toggle="tooltip"]').tooltip();
    setClick(liked);
    setBookmarked(bookmark);
  }, [liked, bookmark]);

  const onBookmark = (id) => {
    dispatch(bookmarkTweet(id));
    setBookmarked(!bookmarked);
  };
  const setId = (ia) => {
    setComId(ia);
    console.log("clicked id is :", ia);
  };

  const commentAdd = (ia) => {
    dispatch(addComment(ia, commentInput, comid, reply));
    setCommentInput("");
    setComId(null);
    console.log("aded on ", ia);
  };
  const sendReTweet = (ia) => {
    dispatch(reTweet(ia));
    console.log("retweeted ", ia);
  };
  return (
    <div className="tweet-bottom-active">
      <i
        data-toggle="tooltip"
        title="Add Reply"
        className="tweetIcons"
        onClick={() => setId(id)}
      >
        <AiOutlineComment data-toggle="modal" data-target="#what" />
      </i>

      {comId && (
        <div
          className="modal fade"
          id="what"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="what"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content modal-custom-css">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add Comment
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body custom-modal-body">
                <textarea
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  type="text"
                  name="text"
                  placeholder="add Comment"
                 
                  className="inputTag"
                  autoFocus
                ></textarea>
              </div>
              <div className="modal-footer">
              <AddPicker
                  classNem="picker-comment"
                  setInput={setCommentInput}
                />
                
                <button
                  onClick={() => commentAdd(comId)}
                  type="button"
                  className="link-tweet outline"
                  data-dismiss="modal"
                >
                  Add Reply
                </button>
                <button
                  onClick={() => setComId(null)}
                  type="button"
                  className="link-tweet"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     { retweet ? <i data-toggle="tooltip" title="Remove reTweet" className="tweetIcons">
        <AiOutlineRetweet
         color="lightgreen"
          onClick={() => dispatch(deleteTweet(oriId,true)) }/>
      </i>:
      <i data-toggle="tooltip" title="Re- Tweet" className="tweetIcons">
       <AiOutlineRetweet onClick={() => sendReTweet(id)} /></i>
      }
      <i className="tweetIcons heart-parent">
        <Heart
          isclicked={isclicked ? 1 : 0}
          onClick={() => {
            setClick(!isclicked);
            comid?likeTweetD(comid):likeTweetD(id);
          }}
        />

        <span className="count">{like_count}</span>
      </i>
      {bookmarked ? (
        <i
          data-html="true"
          data-toggle="tooltip"
          title="Bookmark"
          data-placement="up"
          className="tweetIcons pointer"
        >
          <FiShare color="lightgreen" onClick={() => onBookmark(id)} />
        </i>
      ) : (
        <i
          data-toggle="tooltip"
          title="Bookmark!"
          className="tweetIcons pointer"
        >
          <FiShare onClick={() => onBookmark(id)} />
        </i>
      )}
    </div>
  );
};
TweetOperation.propTypes = {
  liked: PropTypes.bool,
  id: PropTypes.number,
  likeTweetD: PropTypes.func,
  like_count: PropTypes.number,
};
