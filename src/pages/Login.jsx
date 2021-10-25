import React, { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/asyncActions/UserAsync";
import { useHistory } from "react-router-dom";
import { RiTwitterFill, RiEye2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { BiError, BiKey } from "react-icons/bi";
import { WarningText } from "../GooberStyled/Common";
const Login = () => {
  const user = useSelector((state) => state.userReducer);
  const { isAuthenticated } = user;
  const [values, handleChange] = useForm();
  const [type, setType] = useState("password");
  const { email, password } = values;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    isAuthenticated && history.push("/");
  }, [history, isAuthenticated]);

  const loginMe = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const changetype = () => {
    if(type==="password"){
      setType("text")
    }
    if(type==="text"){
      setType("password")
    }
  }

  return (
    <div className="mainForm">
      <Link to="/explore">
        <i style={{ fontSize: 40 }}>
          <RiTwitterFill color="#1da1f2" />
        </i>
      </Link>
      <h1 className="heading">Log in to Twitters</h1>
      <form onSubmit={loginMe}>
        <input
          value={email || ""}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
          className="inputTag"
        />
        <br />
        <span className="position-relative">
          <input
            value={password || ""}
            onChange={handleChange}
            type={type}
            name="password"
            className="inputTag"
            style={{ paddingRight: 60 }}
            placeholder="password"
          />

          <BiKey
            style={{
              position: "absolute",
              top: -5,
              right: 20,
              fontSize: 30,
              cursor: "pointer",
            }}
            onClick={changetype}
            color="#1da1f2"
          />
        </span>

        <br />
        {user.error && (
          <WarningText>
            <BiError /> {user.error}
          </WarningText>
        )}
        <button
          type="submit"
          disabled={!email || !password}
          className="link-tweet login-btn"
        >
          {user.isLoading ? (
            <ClipLoader color="white" loading={true} size={26} />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p className="help-text">
        Don't have account ?
        <Link to="/register">
          <span className="link-go mx-3">Register</span>
        </Link>
      </p>
      <p className="help-text">
        Want to browse without login ?
        <Link to="/explore">
          <span className="link-go mx-3">Explore</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
