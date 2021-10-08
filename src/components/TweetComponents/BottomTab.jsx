import React from 'react'
import { BsSearch ,BsHouse ,BsPerson } from "react-icons/bs";
import {BiBell} from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const BottomTab = () => {
  const user = useSelector(state => state.userReducer.user?.username)
  const noticeInfo = useSelector((state) => state.notificationReducer);
  const noticeCount = noticeInfo?.count;
    return (
        <div className="bottom-menu">
        <ul>
          <Link to="/" className="icon">
            <BsHouse />
          </Link>
          <Link to="/explore" className="icon">
          <BsSearch />
          </Link>
          <Link to={`/${user}`} className="icon"> 
            <BsPerson />
          </Link>
          {/* <Link to="/notifications" className="icon">
           <BsBell />
          </Link> */}
          <li className="notify-div">
            <Link to="/notifications">
              {noticeCount && <div className="notify-count">{noticeCount}</div>}
              <i>
              <BiBell className="icon"/>
              </i>
         
              
            
            </Link>
          </li>
        </ul>
      </div>
    )
}

export default BottomTab
