import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineRetweet,
} from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Heart from "../GooberStyled/TwitterHeart";
import { bookmarkTweet } from "../redux/asyncActions/TweetAsync";
import { addComment } from "../redux/asyncActions/CommentAsync";

export const TweetOperation = ({
  bookmark,
  liked,
  id,
  likeTweetD,
  like_count,
}) => {
  const [isclicked, setClick] = useState(null);
  const dispatch = useDispatch();
  const [comId, setComId] = useState(null);
  const [bookmarked, setBookmarked] = useState(null);
  useEffect(() => {
    setClick(liked);
    setBookmarked(bookmark);
  }, [liked, bookmark]);

  const onBookmark = (id) => {
    dispatch(bookmarkTweet(id));
    setBookmarked(!bookmarked);
  };
  const setId = () => {
    setComId(id);
    console.log(id)
    console.log('setId ' ,comId)
  };
  return (
    <div className="tweet-bottom-active">
      <i className="tweetIcons">
        <AiOutlineComment
            //  onClick={setId}
          data-toggle="modal"
          data-target={`#${id}CommentModal`}
          // data-target="#what"
       
        />
      </i>
      <CommentModal idName={`${comId}CommentModal`} comId={parseInt(id)} />
      <i className="tweetIcons">
        <AiOutlineRetweet />
      </i>
      <i className="tweetIcons heart-parent">
        <Heart
          isclicked={isclicked ? 1 : 0}
          onClick={() => {
            setClick(!isclicked);
            likeTweetD(id);
          }}
        />
        <span className="count">{like_count}</span>
      </i>
      {bookmarked ? (
        <i className="tweetIcons pointer">
          <FiShare color="lightgreen" onClick={() => onBookmark(id)} />
        </i>
      ) : (
        <i className="tweetIcons pointer">
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

const CommentModal = ({ idName, comId }) => {
  const [commentInput, setCommentInput] = useState();
  const dispatch = useDispatch();
  const commentAdd = () => {
    dispatch(addComment(comId, commentInput));
    setCommentInput("");
  };

  return (
    <div
      className="modal fade"
      // id={`${idName}`}
      // id={`${comId}CommentModal`}
      id={idName}
      // id="what"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
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
            ></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="link-tweet " data-dismiss="modal">
              Close
            </button>
            <button
              onClick={commentAdd}
              type="button"
              className="link-tweet outline"
              data-dismiss="modal"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
