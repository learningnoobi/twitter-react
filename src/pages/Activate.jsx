import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verify } from "../redux/asyncActions/UserAsync";

const Activate = () => {
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();
  const { uid, token } = useParams();
  console.log(uid, token);
  const verifyMe = () => {
    dispatch(verify(uid, token));
    setVerified(true);
  };
  if(verified){
    <Redirect to="/login"/>
  }

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
