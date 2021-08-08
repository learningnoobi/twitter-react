import React, { useEffect } from "react";
import useForm from "../hooks/useForm";
import { useDispatch,useSelector } from "react-redux";
import { register } from "../redux/slices/userSlice";
import {useHistory} from 'react-router-dom'
const Register = () => {
  const [values, handleChange, disabled] = useForm()
  const { firstname, lastname, email, password, re_password } = values;
  const dispatch = useDispatch();
  const history = useHistory()
  const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
  const registerMe = (e) => {
    e.preventDefault();
    dispatch(register(firstname, lastname, email, password, re_password));
  };
  useEffect(() => {
    if(isAuthenticated){
      history.push('/')
    }
  },[])
  return (
    <div>
      <h2>Register Page I guess</h2>
      <form onSubmit={registerMe}>
        <input
          value={firstname || ""}
          onChange={handleChange}
          type="text"
          name="firstname"
          placeholder="firstname"
        />
        <br />
        <input
          value={lastname || ""}
          onChange={handleChange}
          type="text"
          name="lastname"
          placeholder="lastname"
        />
        <br />
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
        <input
          value={re_password || ""}
          onChange={handleChange}
          type="password"
          name="re_password"
          placeholder="re password"
        />
        <br />
        <button type="submit" disabled={disabled} className="btn btn-danger">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
