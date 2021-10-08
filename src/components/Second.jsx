import React from "react";
import Sidebar from "./Sidebar";
import BottomTab from "./TweetComponents/BottomTab";
import TrendBar from "./TweetComponents/TrendBar";


const Second = (props) => {

  return (
    <>
    <Sidebar />
    <div className="second" id="second">
      <div className="second-tweet">
      {props.children}

      
      </div>
      <TrendBar />
      <BottomTab />
    </div>
    </>
  );
};

export default React.memo(Second);
