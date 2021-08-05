import React from "react";
import { Link } from "react-router-dom";

import {
  AiOutlinePicture,
  AiOutlineGif,
  AiOutlineSmile,
  AiOutlineSchedule,
  AiOutlineBarChart,
} from "react-icons/ai";
const AddTweet = () => {
  return (
    <div className="add-tweet">
      <span className="add-tweet-image">
        <Link>
          <img
            alt="img"
            src="https://qph.fs.quoracdn.net/main-qimg-92e5c1d46505b34638aafd281449dabc"
            className="rounded-circle profile-image"
            width="60px"
            height="60px"
          />
        </Link>
      </span>
      <div className="add-tweet-input">
       
          <textarea
            type="text"
            rows="3"
            cols="50"
            placeholder=" What's happening ?"
          ></textarea>
        
        <div>
          <ul className="add-tweet-icon">
            <div className="add-icon">
              <li className="side-icon">
                <AiOutlinePicture />
              </li>
              <li className="side-icon">
                <AiOutlineSmile />
              </li>
              <li className="side-icon">
                <AiOutlineBarChart />
              </li>
              <li className="side-icon">
                <AiOutlineGif />
              </li>
              <li className="side-icon">
                <AiOutlineSchedule />
              </li>
            </div>

            <li className="link-tweet">
              <span>Tweet</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddTweet;
