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
    <div>
      <h2>Activate Account</h2>

      <button onClick={verifyMe} className="btn btn-danger">
        Submit
      </button>
    </div>
  );
};

export default Activate;
