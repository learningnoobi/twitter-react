import React, { useEffect, useState } from "react";
import { userEdit, userProfile } from "../redux/asyncActions/UserAsync";
import { useDispatch, useSelector } from "react-redux";

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

  // const onOpenModal = () => setOpen(true);
  // const onCloseModal = () => setOpen(false);
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
                    // onClick={() => setShowUserModal(!showUserModal)}
                    className="link-tweet"
                    type="button"
                    data-toggle="modal"
                    data-target="#userModal"
                  >
                    Edit Profile
                  </button>

                  <UserEditModal user={userprofile} modalId="userModal" />
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

const UserEditModal = ({ user, modalId }) => {
  const dispatch = useDispatch();
  console.log(user);
 const [bio, setBio] = useState(user?.bio);
 const [nickname, setNickname] = useState(user?.nickname);
  const updateUser = () => {
    dispatch(userEdit(user.username, { nickname: nickname, bio: bio }));
  };
  return (
    <div
      className="modal fade"
      id={`${modalId}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content modal-custom-css">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Edit Profile
            </h5>
          </div>
          <div id="modalId" className="modal-body custom-modal-body">
          <div style={{ position: "relative" }}>
              <img
                // onClick={() => setCoverVisible(true)}
                src={user?.cover_image}
                alt="cover image"
                className="cover-image"
                title="change cover image"
              />
               <img
                // onClick={() => setVisible(true)}
                src={user?.avatar}
                alt="profile image"
                className="rounded-circle profile-image"
                title="change profile image"
              />
            </div>
           <div style={{marginTop:"9%"}}>
           <input
              value={nickname}
              onChange={e=>setNickname(e.target.value)}
              type="text"
              name="text"
              placeholder="Add nickname"
              className="inputTag"
            />
            <br />
            <textarea
              value={bio}
              onChange={e=>setBio(e.target.value)}
              type="text"
              name="text"
              placeholder="nickname"
              className="inputTag"
            ></textarea>
           </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button onClick={updateUser} type="button" className="btn btn-outline-success">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
