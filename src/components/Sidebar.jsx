import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { showSidebar } from '../redux/slices/simpleState'
import {
    RiHome7Fill,
    RiTwitterFill,
    RiMailLine,
    RiFileListLine
  } from "react-icons/ri";
  import {BiBell,BiBookmark,BiUser,BiLogIn} from "react-icons/bi"
  import {CgMoreO} from "react-icons/cg"
const Sidebar = () => {
    const sidebarClass = useSelector(state => state.changeClass.myclass)
    const dispatch = useDispatch()
   
    console.log(sidebarClass)
    return (
        
	<div className={`nav ${sidebarClass}`} id="nav">
    <ul className="navbar-nav">
        <li>
            <Link>
            <i><RiTwitterFill/></i><span className="link-text close"
             onClick={()=>dispatch(showSidebar(""))}
             >
                 X</span>
        </Link>
        </li>
        <li>
            <Link><i><RiHome7Fill /></i><span className="link-text">Home</span></Link></li>
        <li>
            <Link><i className="fa fa-rocket"></i><span className="link-text">Explore</span></Link></li>
        <li>
            <Link><i><BiBell /></i><span className="link-text">Notifications</span></Link></li>
        <li>
            <Link><i><RiMailLine/></i><span className="link-text">Messages</span></Link></li>
        <li>
            <Link><i><BiBookmark/></i><span className="link-text">Bookmarks</span></Link></li>
        <li>
            <Link><i><RiFileListLine/></i><span className="link-text">Lists</span></Link></li>
        <li>
            <Link><i><BiUser/></i><span className="link-text">Profile</span></Link></li>
        <li>
            <Link><i><CgMoreO/></i><span className="link-text">More</span></Link></li>
        <li className="link-tweets"><Link><i className="fa fa-plus"></i><span className="link-text">Tweet</span></Link></li>
        <li>
            <Link to="/login"><i><BiLogIn/></i><span className="link-text">Login</span></Link></li>
    </ul>		
</div>
    )
}

export default Sidebar
