import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showSidebar } from "../redux/slices/simpleState";
import {
  RiHome7Fill,
  RiTwitterFill,
  RiMailLine,
  RiFileListLine,
} from "react-icons/ri";
import { BiBell, BiBookmark, BiUser, BiLogIn } from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
import { logMeOut,checkAuthenticated } from "../redux/slices/userSlice";
const Sidebar = () => {
  const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
  const sidebarClass = useSelector((state) => state.changeClass.myclass);
  const dispatch = useDispatch();

  const logout = () =>{
    if(window.confirm("Are you sure you want to logout?")){
      dispatch(logMeOut())
      dispatch(checkAuthenticated())
    }
    
  }

  return (
    <div className={`nav ${sidebarClass}`} id="nav">
      <ul className="navbar-nav">
        <li>
          <Link to='/'>
            <i>
              <RiTwitterFill />
            </i>
            <span
              className="link-text close"
              onClick={() => dispatch(showSidebar(""))}
            >
              X
            </span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <i>
              <RiHome7Fill />
            </i>
            <span className="link-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <i className="fa fa-rocket"></i>
            <span className="link-text">Explore</span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <i>
              <BiBell />
            </i>
            <span className="link-text">Notifications</span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <i>
              <RiMailLine />
            </i>
            <span className="link-text">Messages</span>
          </Link>
        </li>
        <li>
          <Link>
            <i>
              <BiBookmark />
            </i>
            <span className="link-text">Bookmarks</span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <i>
              <RiFileListLine />
            </i>
            <span className="link-text">Lists</span>
          </Link>
        </li>
        <li>
          <Link to="profile">
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
        <li className="link-tweets">
          <Link to='/'>
            <i className="fa fa-plus"></i>
            <span className="link-text">Tweet</span>
          </Link>
        </li>
        <li>
          {isAuthenticated?
          <Link onClick={logout}>
          <i>
            <BiLogIn />
          </i>
          <span className="link-text">Logout</span>
        </Link>
          :<Link to="/login">
            <i>
              <BiLogIn />
            </i>
            <span className="link-text">Login</span>
          </Link>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
