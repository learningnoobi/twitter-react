import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  tweet_detail,
  deleteTweet,
  likeTweet,
} from "../redux/asyncActions/TweetAsync";

import Second from "../components/Second";
import TweetHeader from "../components/tweetComp/tweetHeader";
import { Link, useHistory } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiUserPlus, BiEditAlt, BiBlock } from "react-icons/bi";
import { removeMesage } from "../redux/slices/tweetSlice";
import AlertMessage from "../components/alertMessage";
import { TweetOperation } from "../components/SimpleComponents";
import { TweetContent } from "../components/tweetComp/TweetContent";
import CommentCard from "../components/CommentCard";
import { addComment, tweet_comments } from "../redux/asyncActions/CommentAsync";
import ClipLoader from "react-spinners/ClipLoader";
import AddPicker from "../components/AddPicker";

const TweetDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();
  const [editTitle, setEditTitle] = useState("");
  const tweet = useSelector((state) => state.tweetReducer.singleTweet);
  const [commentInput, setCommentInput] = useState("");
  const userIn = useSelector(
    (state) => state.userReducer
  );
  const { username, id } = useParams();
  const { user } =userIn;

  const message = useSelector((state) => state.tweetReducer.message);
  const comments = useSelector((state) => state.commentReducer);
  useEffect(() => {
    dispatch(tweet_detail(id));
    dispatch(tweet_comments(id));
  }, []);
  const likeTweetD = (id) => {
    dispatch(likeTweet(id));
  };
  message &&
    setTimeout(() => {
      dispatch(removeMesage());
    }, 3000);

  const editpost = () => {
    setEdit((prev) => !prev);
    setIsOpen(!isOpen);
    setEditTitle(tweet.title);
  };
  const commentAdd = () => {
    dispatch(addComment(id, commentInput));
    setCommentInput("");
  };
  return (
    <div>
      {/* <Sidebar /> */}
      {/* alert message during tweet operations */}
      {message && (
        <AlertMessage
          removeMesage={removeMesage}
          dispatch={dispatch}
          message={message}
        />
      )}
      {/* tweet card */}
      {tweet.author && (
        <Second>
          <TweetHeader headerName="Detail" />
          <div className="tweetCard">
            <div className="actual-tweet">
              <span>
                <FiMoreHorizontal
                  data-toggle="dropdown"
                  className="dropdownIcon"
                  id={`#${tweet.id}dropdown`}
                  aria-haspopup="true"
                  aria-expanded="false"
                  // onClick={() => setIsOpen(!isOpen)}
                  className="dropdownIcon"
                />
               
                 
                  <div className="dropdown-menu dropdown-menu-right dropdownMenu">
                    <p>
                      <BiUserPlus /> <span>Unfollow Rayos</span>
                    </p>
                    <p>
                      <BiBlock />
                      <span>Block</span>
                    </p>
                    {user.email === tweet.author.email && (
                      <>
                        <p onClick={editpost}>
                          <BiEditAlt />
                          <span>Edit Post</span>
                        </p>
                        <p
                          onClick={() => {
                            dispatch(deleteTweet(tweet.id));
                            history.push("/");
                          }}
                        >
                          <AiOutlineDelete color="#e0245e" />
                          <span style={{ color: "#e0245e" }}>Delete Post</span>
                        </p>
                      </>
                    )}
                  </div>
                
              </span>
              <span className="add-tweet-image">
                <Link to={`/${tweet.author.username}`}>
                  <img
                    alt="img"
                    src={tweet.author.avatar}
                    className="rounded-circle author-image"
                    width="60px"
                    height="60px"
                  />
                </Link>
              </span>
              {/* Tweet content component which shows tweet info - title,images,viewer */}
              <TweetContent
                tweet={tweet}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                edit={edit}
                setEdit={setEdit}
                id={tweet.id}
                dispatch={dispatch}
              />
            </div>
            <TweetOperation
            user = {user}
              id={parseInt(id)}
              liked={tweet.iliked}
              likeTweetD={likeTweetD}
              like_count={tweet.like_count}
              tweet={tweet}
              bookmark = {tweet.i_bookmarked}
            />
          </div>
          {/* comment lists */}
          <section className="comment-list">
            <div className="commentDiv">
              <img
                src={
                  (user && user.avatar) ||
                  "https://qph.fs.quoracdn.net/main-qimg-92e5c1d46505b34638aafd281449dabc"
                }
                alt="comment-author"
                className="authorImage"
              />
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="commentInput"
                placeholder="Tweet your Reply"
              ></textarea>

              <AddPicker setInput={setCommentInput}/>
              <button
                disabled={!commentInput}
                onClick={commentAdd}
                className="link-tweet"
              >
                {comments.uploading ? (
                  <ClipLoader color="white" loading={true} size={18} />
                ) : (
                  "Reply"
                )}
              </button>
            </div>
            {comments && comments.isLoading ? (
              <span className="d-flex justify-content-center mt-4">
                <ClipLoader color="#f44" loading={true} size={23} />
              </span>
            ) : (
              comments.commentList.map((comment) => (
                <CommentCard
                  tweetId={tweet.id}
                  user={user}
                  key={comment.id}
                  comment={comment}
                 
                />
              ))
            )}
          </section>
        </Second>
      )}
    </div>
  );
};

export default TweetDetail;
