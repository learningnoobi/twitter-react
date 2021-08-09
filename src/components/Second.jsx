import React from "react";
import BottomTab from "./tweetComp/BottomTab";
import TrendBar from "./tweetComp/TrendBar";


const Second = (props) => {
  return (
    <div className="second" id="second">
      <div className="second-tweet">
        {props.children}
      </div>
      <TrendBar />
      <BottomTab />
    </div>
  );
};

export default React.memo(Second);
