import React, { useEffect, useState } from "react";
import { load_user, userProfile } from "../redux/asyncActions/UserAsync";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Second from "../components/Second";
import Moment from "moment";
import useUserInfo from "../hooks/useUserInfo";
import { AiOutlineSchedule } from "react-icons/ai";
import { useParams } from "react-router-dom";
import TweetHeader from "../components/tweetComp/tweetHeader";
import Viewer from "react-viewer";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
  const { username } = useParams();
  //   const { user } = useUserInfo();
  const [visible, setVisible] = useState(false);
  const [covervisible, setCoverVisible] = useState(false);
  const dispatch = useDispatch();
  const userIn = useSelector((state) => state.userReducer);
  const userprofile = userIn.user;
  useEffect(() => {
    dispatch(userProfile(username));
  }, []);
  return (
    <div>
      <Sidebar />
      <Second>
       {userIn.isLoading?
       <span className="d-flex justify-content-center mt-4">
       <ClipLoader color="#f44" loading={true} size={23} />
     </span>
       :<><TweetHeader headerName="profile" />
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
                joined {Moment(userprofile?.date_joined).format("MMMM Do YYYY")}
              </span>
            </span>
          </p>
          <div className="d-flex">
            <FollowInfo number="102" followinfo="followers"/>
            <FollowInfo number="17" followinfo="following"/>
          </div>
        </div></>}
      </Second>
    </div>
  );
};

export default Profile;

const FollowInfo = ({number,followinfo}) => {
  return (
    <div className="d-flex">
      <span className="bold-text">{number}</span>
      <span className="mx-2 side-name">{followinfo}</span>
    </div>
  );
};
