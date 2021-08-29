import React, { useEffect } from "react";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthenticated, login } from "../redux/asyncActions/UserAsync";
import { useHistory } from "react-router-dom";
import { RiTwitterFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { BiError } from "react-icons/bi";
import { WarningText } from "../GooberStyled/Common";
const Login = () => {
  const user = useSelector((state) => state.userReducer);
  const {isAuthenticated} = user;
  const [values, handleChange] = useForm();
  const { email, password } = values;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    // dispatch(checkAuthenticated());
    isAuthenticated && history.push("/");
  }, [history,user.isAuthenticated]);
  const loginMe = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
   
  };

  return (
    <div className="mainForm">
     <Link to="/">
     <i style={{ fontSize: 40 }}>
        <RiTwitterFill color="#1da1f2" />
      </i>
     </Link>
      <h1 className="heading">Log in to Twitter</h1>
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

        <input
          value={password || ""}
          onChange={handleChange}
          type="password"
          name="password"
          className="inputTag"
          placeholder="password"
        />
        <br />
        {user.error && <WarningText>
          <BiError /> {user.error}
        </WarningText>}
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
   
    </div>
  );
};

export default Login;
