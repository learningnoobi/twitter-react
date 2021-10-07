import React from 'react'
import { BsSearch ,BsHouse ,BsPerson ,BsBell} from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const BottomTab = () => {
  const user = useSelector(state => state.userReducer.user?.username)
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
          <Link to="/notifications" className="icon">
           <BsBell />
          </Link>
        </ul>
      </div>
    )
}

export default BottomTab
