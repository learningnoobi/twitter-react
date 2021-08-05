import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { showSidebar } from '../redux/slices/simpleState'

const Sidebar = () => {
    const sidebarClass = useSelector(state => state.changeClass.myclass)
    const dispatch = useDispatch()
   
    console.log(sidebarClass)
    return (
        
	<div className={`nav ${sidebarClass}`} id="nav">
    <ul className="navbar-nav">
        <li>
            <Link>
            <i className="fa fa-twitter"></i><span className="link-text close"
             onClick={()=>dispatch(showSidebar(""))}
             >
                 X</span>
        </Link>
        </li>
        <li>
            <Link><i className="fa fa-home"></i><span className="link-text">Home</span></Link></li>
        <li>
            <Link><i className="fa fa-rocket"></i><span className="link-text">Explore</span></Link></li>
        <li>
            <Link><i className="fa fa-bell"></i><span className="link-text">Notifications</span></Link></li>
        <li>
            <Link><i className="fa fa-twitter"></i><span className="link-text">Messages</span></Link></li>
        <li>
            <Link><i className="fa fa-bookmark"></i><span className="link-text">Bookmarks</span></Link></li>
        <li>
            <Link><i className="fa fa-list"></i><span className="link-text">Lists</span></Link></li>
        <li>
            <Link><i className="fa fa-user"></i><span className="link-text">Profile</span></Link></li>
        <li>
            <Link><i className="fa fa-arrow-up"></i><span className="link-text">More</span></Link></li>
        <li className="link-tweets"><Link><i className="fa fa-plus"></i><span className="link-text">Tweet</span></Link></li>
        <li>
            <Link to="/login"><i className="fa fa-delete"></i><span className="link-text">Login</span></Link></li>
    </ul>		
</div>
    )
}

export default Sidebar
