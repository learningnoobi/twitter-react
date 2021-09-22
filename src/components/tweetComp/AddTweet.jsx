import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {
  AiOutlinePicture,
  AiOutlineGif,
  AiOutlineSmile,
  AiOutlineSchedule,
  AiOutlineBarChart,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { FaGlobeAfrica } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addTweet } from "../../redux/asyncActions/TweetAsync";
import ClipLoader from "react-spinners/ClipLoader";
// import useUserInfo from "../../hooks/useUserInfo";

const AddTweet = () => {
  const userIn = useSelector((state) => state.userReducer);
  const uploading = useSelector((state) => state.tweetReducer.uploading);
  const [tweetInput, setTweetInput] = useState("");
  const [PrevImage, setPrevImage] = useState(null);
  const [tweetImage, setTweetImage] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showPublic, setShowPublic] = useState(false);

  const dispatch = useDispatch();
  const inputOpenFileRef = useRef(null);
  const { user, isAuthenticated } = userIn;

  useEffect(() => {
    //bootstrap tooltip
    window.$('[data-toggle="tooltip"]').tooltip();
  }, []);

  const addEmoji = (emoji) => {
    setTweetInput((prev) => prev + emoji.native);
  };

  const showOpenFileDlg = () => {
    inputOpenFileRef.current.click();
  };
  const imageChanged = (e) => {
    setTweetImage(e.target.files[0]);
    setPrevImage(URL.createObjectURL(e.target.files[0]));
  };
  const submitTweet = () => {
    const uploadData = new FormData();
    uploadData.append("title", tweetInput);
    tweetImage && uploadData.append("image", tweetImage);
    dispatch(addTweet(uploadData));
    setPrevImage(null);
    setTweetImage(null);
    setTweetInput("");
  };
  return (
    <div className="add-tweet">
      {!isAuthenticated ? (
        <h4>Login To Add Tweet</h4>
      ) : (
        <>
          <span className="add-tweet-image">
            <Link to={(user && `${user.username}`) || "/"}>
              <img
                alt="img"
                src={
                  (user && user.avatar) ||
                  "https://qph.fs.quoracdn.net/main-qimg-92e5c1d46505b34638aafd281449dabc"
                }
                className="rounded-circle author-image"
                width="60px"
                height="60px"
              />
            </Link>
          </span>
          <div className="add-tweet-input">
            <textarea
              type="text"
              rows="3"
              value={tweetInput}
              onChange={(e) => setTweetInput(e.target.value)}
              cols="50"
              onClick={(prev) => setShowPublic(!prev)}
              className="addTweetTitle"
              placeholder=" What's happening ?"
            ></textarea>
            {showPublic && (
              <div className="setPublic mx-3">
                <FaGlobeAfrica />
                <span className="mx-2">Set As public</span>
              </div>
            )}
            <div>
              <div>
                {PrevImage && (
                  <span style={{ position: "relative" }}>
                    <img
                      src={PrevImage}
                      alt="img preview"
                      height="160"
                      width="200"
                      style={{ objectFit: "cover", borderRadius: 8 }}
                    />
                    <AiOutlineCloseCircle
                      onClick={() => setPrevImage(null)}
                      style={{
                        position: "absolute",
                        top: -63,
                        right: 6,
                        cursor: "pointer",
                        fontSize: 20,
                        color: "#f44",
                      }}
                    />
                  </span>
                )}
              </div>
              <ul className="add-tweet-icon">
                <div className="add-icon">
                  <li
                    data-toggle="tooltip"
                    title="Add Image"
                    data-placement="bottom"
                    className="side-icon"
                  >
                    <input
                      onChange={imageChanged}
                      ref={inputOpenFileRef}
                      type="file"
                      style={{ display: "none" }}
                    />

                    <AiOutlinePicture
                      data-placement="up"
                      onClick={showOpenFileDlg}
                    />
                  </li>
                  <li
                    data-toggle="tooltip"
                    title="Add Emoji"
                    data-placement="bottom"
                    className="side-icon"
                  >
                    <AiOutlineSmile onClick={() => setShowEmoji(!showEmoji)} />
                  </li>
                  <li
                    data-toggle="tooltip"
                    title="Add Bar"
                    data-placement="bottom"
                    className={`side-icon ${PrevImage && 'disabled'}`}
                    
                  >
                    <AiOutlineBarChart />
                  </li>
                  <li
                    data-toggle="tooltip"
                    title="Add Gif"
                    data-placement="bottom"
                    className={`side-icon ${PrevImage && 'disabled'}`}
                  >
                    <AiOutlineGif />
                  </li>
                  <li
                    data-toggle="tooltip"
                    title="Add Schedule"
                    data-placement="bottom"
                    className={`side-icon ${PrevImage && 'disabled'}`}
                  >
                    <AiOutlineSchedule />
                  </li>
                  
                </div>

                <button
                  disabled={!tweetInput}
                  onClick={() => submitTweet()}
                  className="link-tweet"
                >
                  {uploading ? (
                    <ClipLoader color="white" loading={true} size={16} />
                  ) : (
                    "Tweet"
                  )}
                </button>
              </ul>
              {showEmoji && (
                <Picker
                  className="dropdown-menu dropdown-menu-right"
                  set="twitter"
                  showPreview={true}
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: -18,
                    display: `${showEmoji}`,
                    zIndex: 10,
                  }}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(AddTweet);
