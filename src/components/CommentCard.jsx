import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { TweetOperation } from "./SimpleComponents";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { BiUserPlus, BiEditAlt, BiBlock } from "react-icons/bi";
import { delComment ,editComment} from "../redux/asyncActions/CommentAsync";
import Moment from 'moment'
import AddPicker from "./AddPicker";
const CommentCard = ({ tweetId, user, comment}) => {
  const [curIndex, setCurIndex] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editCommentInput, setEditComment] = useState(comment.body);
  const dispatch = useDispatch();
  const sendEditComment = (id) => {
    dispatch(editComment(id,editCommentInput))
    setEdit(false)
  }
  return (
    <div className="comment-card animate__bounceIn">
      <span>
        <FiMoreHorizontal
          onClick={() =>
            setCurIndex(curIndex === comment.id ? null : comment.id)
          }
          className="dropdownIcon"
        />
        {curIndex === comment.id && (
          <div className="dropdownMenu">
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
        )}
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
            <span className="side-names"> 
              {Moment(comment.created).fromNow()}
              {comment.isEdited && '- Edited'}
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
     
          <AddPicker classNem="picker-comment" setInput={setEditComment}/>
        
          <button onClick={()=>{
                sendEditComment(comment.id)
              }} className="btn btn-primary">Edit</button>
            
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
      <TweetOperation />
    </div>
  );
};

export default CommentCard;
