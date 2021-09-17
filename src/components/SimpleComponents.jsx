import React, { useState, useEffect,useRef} from "react";

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
  comid=null,
  reply
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
    dispatch(addComment(ia, commentInput,comid,reply));
    setCommentInput("");
    setComId(null);
    console.log("aded on ", ia);
  };

  return (
    <div className="tweet-bottom-active">
      <i data-toggle="tooltip" title="Add Reply" className="tweetIcons" onClick={() => setId(id)}>
        <AiOutlineComment 
        data-toggle="modal" data-target="#what" />
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
               
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setComId(null)}
                  type="button"
                  className="link-tweet "
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={() => commentAdd(comId)}
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
      )}

      <i  data-toggle="tooltip" title="Re- Tweet" className="tweetIcons">
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
        <i 
        data-html="true"
        data-toggle="tooltip" title="Bookmark" 
        data-placement="up"
        className="tweetIcons pointer">
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

const CommentModal = ({ idName, comId }) => {
  const [commentInput, setCommentInput] = useState();
  const dispatch = useDispatch();
  // console.log(idName)
  const commentAdd = () => {
    comId && dispatch(addComment(comId, commentInput));
    setCommentInput("");
  };

  return (
    <div
      className="modal fade"
      id={`${idName}`}

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
