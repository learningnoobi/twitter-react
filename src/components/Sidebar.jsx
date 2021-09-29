import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, NavLink } from "react-router-dom";
import { showSidebar } from "../redux/slices/simpleState";
import {
  RiHome7Fill,
  RiTwitterFill,
  RiMailLine,
  RiFileListLine,
} from "react-icons/ri";
import {
  BiBell,
  BiBookmark,
  BiUser,
  BiLogIn,
  BiGlobeAlt,
} from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
import {
  checkAuthenticated,
  load_user,
  logoutAct,
} from "../redux/asyncActions/UserAsync";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { removeNotice, tweetNotice } from "../redux/slices/NotificationSlice";
import AlertMessage from "./alertMessage";

const Sidebar = () => {
  const [isSameUser, setisSameUser] = useState(true);
  const userIn = useSelector((state) => state.userReducer);
  const sidebarClass = useSelector((state) => state.changeClass.myclass);
  const noticeInfo = useSelector((state) => state.notificationReducer);
  const dispatch = useDispatch();
  const noticeCount = noticeInfo.count;
  const message = noticeInfo.message;

  let endpoint = "ws://127.0.0.1:8000/ws/home/";
  const client = new W3CWebSocket(endpoint + "?token=" + userIn.access);
  message &&
    setTimeout(() => {
      dispatch(removeNotice());
    }, 3000);


  useEffect(() => {
    client.onopen = function () {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log(data);

      dispatch(tweetNotice(data.payload));
      if (user?.username === data.payload.from) {
        setisSameUser(true);
      }
      setisSameUser(false);
    };

    client.onclose = function () {
      console.log("WebSocket Client disconnected");
    };
  }, []);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logoutAct());
      dispatch(load_user());
      dispatch(checkAuthenticated());
    }
    <Redirect to="/login"></Redirect>;
    window.location.reload();
  };
  const { user, isAuthenticated } = userIn;

  return (
    <>
      {!isSameUser && message && (
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
            <Link to="/">
              <i>
                <BiGlobeAlt />
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
          <li>
            <Link to="/">
              <i>
                <RiMailLine />
              </i>
              <span className="link-text">Messages</span>
            </Link>
          </li>
          <li>
            <Link to="/bookmark">
              <i>
                <BiBookmark />
              </i>
              <span className="link-text">Bookmarks</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <i>
                <RiFileListLine />
              </i>
              <span className="link-text">Lists</span>
            </Link>
          </li>
          <li>
            <Link to={(user && `/${user.username}`) || "profile"}>
              <i>
                <BiUser />
              </i>
              <span className="link-text">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <i>
                <CgMoreO />
              </i>
              <span className="link-text">More</span>
            </Link>
          </li>
          <li
            className="link-tweets"
            data-toggle="tooltip"
            data-placement="top"
            title="Add Tweet"
          >
            <Link to="/">
              <i className="fa fa-plus"></i>
              <span className="link-text">Tweet</span>
            </Link>
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
