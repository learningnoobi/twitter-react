import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { showSidebar } from "../../redux/slices/simpleState";
import { AiOutlineArrowLeft } from "react-icons/ai";
const TweetHeader = ({
  headerName,
  back = true,

}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className="tweet-header">
      <div className="d-flex align-items-center">
        {back && (
          <i className="btns">
            <AiOutlineArrowLeft onClick={() => history.goBack()} />
          </i>
        )}
        <div className="d-flex justify-content-center align-items-center">
          <h4 className="mx-2">{headerName}</h4>
        
        </div>
      </div>
      <button className="btns" onClick={() => dispatch(showSidebar("sidebar"))}>
        ☰
      </button>
    </div>
  );
};

export default TweetHeader;
