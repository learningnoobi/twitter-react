import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeTweets from "../components/HomeTweets";
import { removeMesage } from "../redux/slices/tweetSlice";
import AlertMessage from "../components/alertMessage";
import useUserInfo from "../hooks/useUserInfo";
import { load_user } from "../redux/asyncActions/UserAsync";

const Home = () => {
  // const {isAuthenticated} = useUserInfo();
  const message = useSelector((state) => state.tweetReducer.message);
  const dispatch = useDispatch();
  const history = useHistory();
  message &&
    setTimeout(() => {
      dispatch(removeMesage());
    }, 3000);


 

  return (
    <div>
      {/* <Sidebar /> */}
      <HomeTweets />
      {message && (
        <AlertMessage
          removeMesage={removeMesage}
          dispatch={dispatch}
          message={message}
        />
      )}
    </div>
  );
};

export default Home;
