import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TweetOperation } from "../TweetOperation";
import { FiMoreHorizontal } from "react-icons/fi";

import { useDispatch } from "react-redux";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";
import {
  editComment,
  likeComment,
} from "../../redux/asyncActions/CommentAsync";
import Moment from "moment";
import ReplyComment from "./ReplyComment";
import { EditPost } from "../EditPost";
import { DropdownContent } from "./DropDownContent";

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
  const likeTweetD = (id) => {
    dispatch(likeComment(id));
  };
  return (
    <div className="comment-card ">
      <span>
        <FiMoreHorizontal
          data-toggle="dropdown"
          className="dropdownIcon"
          aria-haspopup="true"
          aria-expanded="false"
        />

        <div className="dropdown-menu dropdown-menu-right dropdownMenu">
          <DropdownContent
            setEdit={setEdit}
            dispatch={dispatch}
            user={user}
            setCurIndex={setCurIndex}
            comment={comment}
          />
        </div>
      </span>

      <div key={comment.id} className="comment-innerDiv">
        <Link to={`/${comment.author.username}`}>
          <img
            src={`${comment.author.avatar}`}
            alt="comment-author"
            className="authorImage"
          />
        </Link>

        <div>
          <div className="comment-info">
            {comment.author.username}
            <span className="mx-2 side-name">
              {Moment(comment.created).fromNow(true)}
              {comment.isEdited && "- Edited"}
            </span>
          </div>

          <EditPost
            edit={edit}
            editCommentInput={editCommentInput}
            setEditComment={setEditComment}
            comment={comment}
            setEdit={setEdit}
            sendEditComment={sendEditComment}
          />
        </div>
      </div>

      <TweetOperation
        reply={true}
        id={tweetId}
        comid={comment.id}
        liked={comment.iliked}
        likeTweetD={likeTweetD}
        like_count={comment.like_count}
        NoRetweetMark={true} //don't show retwet or bookmark for comment
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
            user={user}
            setEdit={setEdit}
            setCurIndex={setCurIndex}
          />
          // <CommentCard tweetId={tweetId} user={user} comment={comment}/>
        ))}
    </div>
  );
};

export default CommentCard;
