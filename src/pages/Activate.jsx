import React from "react";
import {useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verify } from "../redux/asyncActions/UserAsync";

const Activate = () => {
  const dispatch = useDispatch();
  const { uid, token } = useParams();
  const history = useHistory();
  console.log(uid, token);
  const verifyMe = () => {
    dispatch(verify(uid, token));
    history.push('/login')
  };


  return (
    <div className="mainForm">
      <h2 className="heading">Activate Account</h2>

      <button onClick={verifyMe} className="link-tweet">
        Activate
      </button>
      <p className="help-text">By clicking this, <br /> your account will be verified and activated !</p>
    </div>
  );
};

export default Activate;
