import React, { useEffect, useState } from "react";
import {
  load_user,
  userEdit,
  userProfile,
} from "../redux/asyncActions/UserAsync";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Second from "../components/Second";
import Moment from "moment";
import useUserInfo from "../hooks/useUserInfo";
import { AiOutlineSchedule, AiOutlineSmile } from "react-icons/ai";
import { useParams } from "react-router-dom";
import TweetHeader from "../components/tweetComp/tweetHeader";
import Viewer from "react-viewer";
import ClipLoader from "react-spinners/ClipLoader";
import { tweet_specific_user } from "../redux/asyncActions/TweetAsync";
import TweetPostCard from "../components/tweetComp/TweetPostCard";
import { removeMesage } from "../redux/slices/tweetSlice";
import AlertMessage from "../components/alertMessage";
import { Modal, ModalContainer } from "../GooberStyled/Common";
import useForm from "../hooks/useForm";
// import { Modal } from "react-responsive-modal";
const Profile = () => {
  const { username } = useParams();
  const { user: authUser } = useUserInfo();
  const [showUserModal, setShowUserModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [covervisible, setCoverVisible] = useState(false);
  const dispatch = useDispatch();
  const userIn = useSelector((state) => state.userReducer);
  const tweetsInfo = useSelector((state) => state.tweetReducer);
  const tweets = tweetsInfo.tweets;
  const message = tweetsInfo.message;
  const userprofile = userIn.profileUser;

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  message &&
    setTimeout(() => {
      dispatch(removeMesage());
    }, 3000);
  useEffect(() => {
    dispatch(userProfile(username));
    dispatch(tweet_specific_user(username));
    // console.log(userprofile);
  }, []);

  return (
    <div>
      <Sidebar />

      <Second>
        {message && (
          <AlertMessage
            removeMesage={removeMesage}
            dispatch={dispatch}
            message={message}
          />
        )}

        {userIn.isLoading ? (
          <span className="d-flex justify-content-center mt-4">
            <ClipLoader color="#f44" loading={true} size={23} />
          </span>
        ) : (
          <>
            <TweetHeader headerName="profile" />
            <div style={{ position: "relative" }}>
              <img
                onClick={() => setCoverVisible(true)}
                src={userprofile?.cover_image}
                alt="profile image"
                className="cover-image"
              />

              <img
                onClick={() => setVisible(true)}
                src={userprofile?.avatar}
                alt="profile image"
                className="rounded-circle profile-image"
              />
              {showUserModal && (
                <UserEditModal
                  user={authUser}
                  setShowUserModal={setShowUserModal}
                />
              )}
              <Viewer
                visible={visible}
                onClose={() => {
                  setVisible(false);
                }}
                images={[{ src: userprofile?.avatar, alt: "img" }]}
              />
              <Viewer
                visible={covervisible}
                onClose={() => {
                  setCoverVisible(false);
                }}
                images={[{ src: userprofile?.cover_image, alt: "img" }]}
              />
              {/* editprofile or follow button section depending on the user */}
              {authUser?.email === userprofile?.email ? (
                <div className="follow-or-edit">
                  <button
                    onClick={() => setShowUserModal(!showUserModal)}
                    className="link-tweet"
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div className="follow-or-edit">
                  <button className="mx-2 btn-outline">
                    <i className="icon">
                      <AiOutlineSmile />
                    </i>
                  </button>
                  <button className="link-tweet">Follow</button>
                </div>
              )}
            </div>

            <div className="user-info">
              <p>
                {userprofile?.username} <br />
                <span className="side-name">@{userprofile?.username}</span>
              </p>
              <p>
                {userprofile?.bio}
                <span className="side-name">
                  <i className="tweetIcons">
                    <AiOutlineSchedule />
                  </i>
                  <span className="mx-2">
                    joined
                    {Moment(userprofile?.date_joined).format("MMMM Do YYYY")}
                  </span>
                </span>
              </p>
              <div className="d-flex">
                <FollowInfo number="102" followinfo="followers" />
                <FollowInfo number="17" followinfo="following" />
              </div>
            </div>
          </>
        )}

        {tweets.map((tweet) => (
          <TweetPostCard
            user={authUser}
            dispatch={dispatch}
            tweet={tweet}
            key={tweet.id}
          />
        ))}
      </Second>
      <div></div>
    </div>
  );
};

export default Profile;

const FollowInfo = ({ number, followinfo }) => {
  return (
    <div className="d-flex">
      <span className="bold-text">{number}</span>
      <span className="mx-2 side-name">{followinfo}</span>
    </div>
  );
};

const UserEditModal = ({ user, setShowUserModal }) => {
  const [values, handleChange] = useForm();
  const dispatch = useDispatch();
  const { nickname, bio } = values;
  console.log(user);
  const updateUser = () => {
    dispatch(userEdit(user.username, { nickname: nickname, bio: bio }));
  };
  return (
    <ModalContainer>
      <Modal>
        <button onClick={() => setShowUserModal(false)} className="link-tweet">
          Close
        </button>
        <h2>Edit Profile</h2>
        <input
          value={nickname || user?.nickname}
          onChange={handleChange}
          type="text"
          name="nickname"
          placeholder="nickname"
        />{" "}
        <br />
        <input
          value={bio || user?.bio}
          onChange={handleChange}
          type="text"
          name="bio"
          placeholder="bio"
        />{" "}
        <br />
        <label htmlFor="profile">Profile</label>
        {/* <input
        value={avatar || user?.avatar}
        onChange={handleChange}
         type="file" name="avatar" id="" /> <br />
        <label htmlFor="cover">Cover</label>
        <input
        value={cover_image || user?.cover_image}
        onChange={handleChange}
        type="file" name="cover_image" id="" /> <br /> */}
        <button onClick={updateUser} className="link-tweet">
          Update
        </button>
      </Modal>
    </ModalContainer>
  );
};
