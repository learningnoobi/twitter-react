import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, NavLink } from "react-router-dom";
import { showSidebar } from "../redux/slices/simpleState";
import {
  RiHome7Fill,
  RiTwitterFill,
  RiMailLine,
  RiGithubFill,
} from "react-icons/ri";
import {
  BiBell,
  BiBookmark,
  BiUser,
  BiLogIn,
  BiGlobeAlt,
  BiHash,
  BiAddToQueue,
} from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
import {
  checkAuthenticated,
  load_user,
  logoutAct,
} from "../redux/asyncActions/UserAsync";
import { removeNotice } from "../redux/slices/NotificationSlice";
import AlertMessage from "./SmallComponent/alertMessage";
import { getNotifications } from "../redux/asyncActions/NotificationAsync";

const Sidebar = () => {
  const userIn = useSelector((state) => state.userReducer);
  const sidebarClass = useSelector((state) => state.changeClass.myclass);
  const noticeInfo = useSelector((state) => state.notificationReducer);
  const dispatch = useDispatch();
  const noticeCount = noticeInfo?.count;
  const message = noticeInfo.message;
  
  useEffect(() => {
    return () => {
      dispatch(showSidebar(""));
    };
  }, [dispatch]);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logoutAct());
      dispatch(load_user());
      dispatch(checkAuthenticated());
    }
  };
  const { user, isAuthenticated } = userIn;
  const goOut = () => {
    window.location.href = "http://github.com/learningnoobi/twitter-react";
  };
  return (
    <>
      {message && (
        <AlertMessage
          removeMesage={removeNotice}
          dispatch={dispatch}
          message={message}
        />
      )}
      <div className={`nav ${sidebarClass}`} id="nav">
        <ul className="navbar-nav">
          <li>
            <Link to="/">
              <i>
                <RiTwitterFill />
              </i>
            </Link>
            <span
              className="link-text close"
              onClick={() => dispatch(showSidebar(""))}
            >
              X
            </span>
          </li>
          <li>
            <NavLink to="/">
              <i>
                <RiHome7Fill />
              </i>
              <span className="link-text">Home</span>
            </NavLink>
          </li>
          <li>
            <Link to="/explore">
              <i>
                <BiHash />
              </i>
              <span className="link-text">Explore</span>
            </Link>
          </li>
          <li className="notify-div">
            <Link to="/notifications">
              {noticeCount && <div className="notify-count">{noticeCount}</div>}
              <i>
                <BiBell />
              </i>
              <span className="link-text">Notifications</span>
            </Link>
          </li>
          {isAuthenticated && (
            <li className="notify-div">
              <Link to="/messages">
              {noticeInfo.msgNotiExist && <div className="notify-count sm"></div>}
                <i>
                  <RiMailLine />
                </i>
                <span className="link-text">Messages</span>
              </Link>
            </li>
          )}
          <li>
            <Link to="/bookmark">
              <i>
                <BiBookmark />
              </i>
              <span className="link-text">Bookmarks</span>
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to={(user && `/${user.username}`) || "profile"}>
                <i>
                  <BiUser />
                </i>
                <span className="link-text">Profile</span>
              </Link>
            </li>
          )}

          <li style={{ cursor: "pointer" }} className="ml-2 p-1">
            <i onClick={goOut}>
              <RiGithubFill />
            </i>
            <span className="link-text">GitHub</span>
          </li>

          <li>
            {isAuthenticated ? (
              <Link to="/" onClick={logout}>
                <i>
                  <BiLogIn />
                </i>
                <span className="link-text">Logout</span>
              </Link>
            ) : (
              <Link to="/login">
                <i>
                  <BiLogIn />
                </i>
                <span className="link-text">Login</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
