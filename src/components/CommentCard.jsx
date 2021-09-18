import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TweetOperation } from "./SimpleComponents";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  BiUserPlus,
  BiEditAlt,
  BiBlock,
  BiCaretUp,
  BiCaretRight,
  BiCaretDown,
} from "react-icons/bi";
import { delComment, editComment } from "../redux/asyncActions/CommentAsync";
import Moment from "moment";
import AddPicker from "./AddPicker";
import { ArcherContainer, ArcherElement } from "react-archer";

const CommentCard = ({ tweetId, user, comment }) => {
  const [curIndex, setCurIndex] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editCommentInput, setEditComment] = useState(comment.body);
  const dispatch = useDispatch();
  const sendEditComment = (id) => {
    dispatch(editComment(id, editCommentInput));
    setEdit(false);
  };

  return (
    <div className="comment-card ">
      <span>
        <FiMoreHorizontal
          data-toggle="dropdown"
          className="dropdownIcon"
          aria-haspopup="true"
          aria-expanded="false"
          className="dropdownIcon"
        />

        <div className="dropdown-menu dropdown-menu-right dropdownMenu">
          {user.email !== comment.author.email && (
            <>
              <p>
                <BiUserPlus /> <span>Unfollow Rayos</span>
              </p>
              <p>
                <BiBlock />
                <span>Block</span>
              </p>
            </>
          )}
          {user.email === comment.author.email && (
            <>
              <p
                onClick={() => {
                  setEdit(true);
                  setCurIndex(null);
                }}
              >
                <BiEditAlt />
                <span>Edit Reply</span>
              </p>
              <p
                onClick={() => {
                  dispatch(delComment(comment.id));
                  setCurIndex(null);
                }}
              >
                <AiOutlineDelete color="#e0245e" />
                <span style={{ color: "#e0245e" }}>Delete Reply</span>
              </p>
            </>
          )}
        </div>
      </span>

      <div key={comment.id} className="comment-innerDiv">
        <Link to={`/${comment.author.username}`}>
          <img
            src={`http://127.0.0.1:8000${comment.author.avatar}`}
            alt="comment-author"
            className="authorImage"
          />
        </Link>

        <div>
          <div className="comment-info">
            {comment.author.username}
            <span className="mx-2 side-name">
              {Moment(comment.created).fromNow()}
              {comment.isEdited && "- Edited"}
            </span>
          </div>
          {edit ? (
            <>
              <div>
                <textarea
                  value={editCommentInput}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="editArea"
                ></textarea>
              </div>

              <div className="d-flex">
                <AddPicker
                  classNem="picker-comment"
                  setInput={setEditComment}
                />

                <button
                  onClick={() => {
                    sendEditComment(comment.id);
                  }}
                  className="btn btn-primary"
                >
                  Edit
                </button>

                <button
                  onClick={() => setEdit(false)}
                  className="btn btn-danger mx-2"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p className="mx-4 mt-2">{comment.body}</p>
          )}
        </div>
      </div>

      <TweetOperation
        reply={true}
        id={tweetId}
        comid={comment.id}
        // liked={tweet.iliked}
        // likeTweetD={likeTweetD}
        // like_count={tweet.like_count}
        // bookmark = {tweet.i_bookmarked}
      />
      {comment.children.length > 0 && (
        <strong
          onClick={() => setShowReply(!showReply)}
          className="d-flex justify-content-center align-items-center my-2 showHideReply"
        >
         
          {showReply ? (
             <span className="showed">
             Hide Replies ({comment.children.length})
            <BiCaretUp className="mx-2" size={24} />
            </span>
          ) : (
            <>
             Show Replies ({comment.children.length})
            <BiCaretDown className="mx-2" size={24} />
            </>
          )}
        </strong>
      )}
      {showReply &&
        comment.children &&
        comment.children.map((childcom) => (
          <ReplyComment
            tweetId={tweetId}
            key={childcom.id}
            childCom={childcom}
            parentCom={comment}
          />
          // <CommentCard tweetId={tweetId} user={user} comment={comment}/>
        ))}
    </div>
  );
};

export default CommentCard;

const ReplyComment = ({ childCom, parentCom, tweetId }) => {
  
  const [showReply, setShowReply] = useState(false);
  return (
    <div className="replyCard ">
      <div className="d-flex">
        <Link to={`/${childCom.author.username}`}>
          <img
            src={`http://127.0.0.1:8000${childCom.author.avatar}`}
            alt="comment-author"
            className="authorImage"
          />
        </Link>
        <div>
        <div className="mx-3 d-flex justify-content-center align-items-center">
          <strong>
            <Link to={`/${childCom.author.username}`}>
              {childCom?.author.username}
            </Link>
            <BiCaretRight />
            <Link to={`/${parentCom.author.username}`}>
              {parentCom.author.username}
            </Link>
            
          </strong>
          <span className="mx-2 side-name">
              - {Moment(childCom.created).fromNow()}
            </span>
        </div>
        <p className="mx-3 side-name">{childCom.body}</p>
        </div>
  
        
        
      </div>
      <TweetOperation reply={true} id={tweetId} comid={childCom.id} />
      {childCom.children.length > 0 && (
        <strong
          onClick={() => setShowReply(!showReply)}
          className="d-flex justify-content-center align-items-center my-2 showHideReply"
        >
         
          {showReply ? (
             <span className="showed">Hide Replies({childCom.children.length})
            <BiCaretUp className="mx-2" size={24} /></span>
          ) : (
            <>
             Show Replies ({childCom.children.length})
            <BiCaretDown className="mx-2" size={24} />
            </>
          )}
        </strong>
      )}
  

      {showReply && childCom.children &&
        childCom.children.map((child) => (
          <ReplyComment
          key={child.id}
            tweetId={tweetId}
            childCom={child}
            parentCom={childCom}
          />
          // <CommentCard tweetId={tweetId} user={user} comment={comment}/>
        ))}
    </div>
  );
};
