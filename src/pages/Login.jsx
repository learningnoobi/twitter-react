import React, { useState,useEffect } from "react";
import useForm from "../hooks/useForm";
import { useDispatch,useSelector } from "react-redux";
import { checkAuthenticated, login } from "../redux/asyncActions/UserAsync";
import {useHistory} from 'react-router-dom'
const Login = () => {
  const user = useSelector(state => state.userReducer)
  const [values, handleChange] = useForm()
  const { email, password } = values;
  const dispatch = useDispatch();
  const history = useHistory()
  useEffect(() =>{
    dispatch(checkAuthenticated())
  },[])
  const loginMe = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
   

  };
 
  if(user.isAuthenticated){
    history.push('/')
  }
  return (
    <div>
      <h2>Register Page I guess</h2>
      <form onSubmit={loginMe}>
        
    
        <input
          value={email || ""}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
        />
        <br />
        <input
          value={password || ""}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="password"
        />
        <br />
     
        <button type="submit" disabled={!email || !password} className="btn btn-danger">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
