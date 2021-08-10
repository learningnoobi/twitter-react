import React from "react";

const CommentCard = ({comment}) => {
  return (
 <div className="comment-card">
      <img
        src={`http://127.0.0.1:8000${comment.author.avatar}`}
        alt="comment-author"
        className="authorImage"
      />
      <div>
        <div className="comment-info">
        {comment.author.first_name} <span className="side-names">@{comment.author.first_name}| 13hrs</span>
        </div>
        <p className="mx-4 mt-2">{comment.body}</p>
      </div>
    </div>
  );
};

export default CommentCard;
