import React from 'react'
import {Link} from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
const TrendBar = () => {
    return (
        <div className="second-trend">
        <div className="search">
        <BsSearch className="searchicon"/>
            {/* <i className="fa fa-search "></i> */}
            <input type="text" id="search-bar" placeholder="Search Twitter" />
        </div>
        <div className="trend">
              <h4 className="h4-title">Trending Posts</h4>
       <div className="trend-div">
               <div className="left-20"> 
           <Link to="/"><small className="trend-title">Bishal</small></Link>
             <Link to="/">
              <p className="trend-list"># Nie boy</p>
            </Link>
           </div>
       </div>
          </div>
       <div className="follow">
           <h4 className="h4-title">Who to Follow ?</h4>

           <span className="trendlist">
                  <span>
                      <Link to="/">
                      <img alt="img" src="http://127.0.0.1:8000/media/avatars/dabiprofile_wTdGFvG.jpg" className="rounded-circle author-image"/></Link></span>
                      <span className="left-20">
                        <Link to="/">
                              <p className="user-list">Rayon | <span className="side-name">@Raee</span></p>
                         </Link>
                          <span className="follow-line"> I am famous !</span>
                   </span>
           </span>
         </div>
    </div>

    )
}

export default TrendBar
