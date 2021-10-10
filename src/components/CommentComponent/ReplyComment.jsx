import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiCaretUp, BiCaretRight, BiCaretDown } from "react-icons/bi";
import Moment from "moment";
import { TweetOperation } from "../TweetOperation";
import { DropdownContent } from "./DropDownContent";
import { FiMoreHorizontal } from "react-icons/fi";
import { editComment, likeComment } from "../../redux/asyncActions/CommentAsync";
import { EditPost } from "../EditPost";

const ReplyComment = ({ childCom, parentCom, tweetId, user, setCurIndex }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [editCommentInput, setEditComment] = useState(childCom.body);
  const likeTweetD = (id) => {
    dispatch(likeComment(id));
  };
  const [showReply, setShowReply] = useState(false);
  const sendEditComment = (id) => {
    dispatch(editComment(id, editCommentInput));
    setEdit(false);
  };
  return (
    <div className="replyCard ">
      <div style={{ position: "relative" }} className="d-flex">
        <FiMoreHorizontal
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          className="dropdownIcon"
        />
        <div className="dropdown-menu dropdown-menu-right dropdownMenu">
          <DropdownContent
            user={user}
            comment={childCom}
            setEdit={setEdit}
            dispatch={dispatch}
            setCurIndex={setCurIndex}
          />
        </div>

        <Link to={`/${childCom.author.username}`}>
          <img
            src={`${childCom.author.avatar}`}
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
              - {Moment(childCom.created).fromNow(true)}
            </span>
          </div>

          <EditPost
            edit={edit}
            editCommentInput={editCommentInput}
            setEditComment={setEditComment}
            comment={childCom}
            setEdit={setEdit}
            sendEditComment={sendEditComment}
          />
        </div>
      </div>

      <TweetOperation
        reply={true}
        id={tweetId}
        comid={childCom.id}
        liked={childCom.iliked}
        likeTweetD={likeTweetD}
        like_count={childCom.like_count}
        NoRetweetMark={true} //don't show retwet or bookmark for comment
      />
      {childCom.children.length > 0 && (
        <strong
          onClick={() => setShowReply(!showReply)}
          className="d-flex justify-content-center align-items-center my-2 showHideReply"
        >
          {showReply ? (
            <span className="showed">
              Hide Replies({childCom.children.length})
              <BiCaretUp className="mx-2" size={24} />
            </span>
          ) : (
            <>
              Show Replies ({childCom.children.length})
              <BiCaretDown className="mx-2" size={24} />
            </>
          )}
        </strong>
      )}

      {showReply &&
        childCom.children &&
        childCom.children.map((child) => (
          <ReplyComment
            key={child.id}
            tweetId={tweetId}
            childCom={child}
            parentCom={childCom}
            user={user}
            setEdit={setEdit}
            setCurIndex={setCurIndex}
          />
        ))}
    </div>
  );
};
export default ReplyComment;
