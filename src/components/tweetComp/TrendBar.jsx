import React from 'react'
import {Link} from 'react-router-dom'
import { BsCardImage,BsSearch } from "react-icons/bs";
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
           <Link><small className="trend-title">Bishal</small></Link>
             <Link>
              <p className="trend-list"># Nie boy</p>
            </Link>
           </div>
       </div>
          </div>
       <div className="follow">
           <h4 className="h4-title">Who to Follow ?</h4>

           <span className="trendlist">
                  <span>
                      <Link>
                      <img alt="img" src="dabi.jpg" className="rounded-circle profile-image" width="50px" height="50px"/></Link></span>
                      <span className="left-20">
                        <Link>
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
