import React, { useEffect } from "react";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/asyncActions/UserAsync";
import { useHistory } from "react-router-dom";
import { RiTwitterFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { WarningText } from "../GooberStyled/Common";
import AlertMessage from "../components/SmallComponent/alertMessage";
import { removeMesage } from "../redux/slices/userSlice";

const Register = () => {
  const [values, handleChange, disabled] = useForm();
  const { username, email, password, re_password } = values;
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.userReducer);
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const registerMe = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password, re_password));
  };
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated,history]);
  return (
    <div className="mainForm">
      <div style={{maxWidth:'400px'}}>
      <i style={{ fontSize: 40 }}>
        <RiTwitterFill color="#1da1f2" />
      </i>
      <h2 className="heading">Register In Twitter</h2>
      {user.message && (
        <AlertMessage
          removeMesage={removeMesage}
          dispatch={dispatch}
          message={user.message}
        />
      )}
      <form onSubmit={registerMe} autoComplete="false">
        <input
          value={username || ""}
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="username"
          className="inputTag"
        />

        <br />
        <input
          value={email || ""}
          onChange={handleChange}
          type="email"
          name="email"
          className="inputTag"
          placeholder="email"
        />
        <br />
        <input
          value={password || ""}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="password"
          className="inputTag"
        />
        <br />
        <input
          value={re_password || ""}
          onChange={handleChange}
          type="password"
          className="inputTag"
          name="re_password"
          placeholder="re password"
        />

        {user.error && <WarningText>{user.error}</WarningText>}
        <button
          type="submit"
          disabled={disabled}
          className="link-tweet login-btn"
        >
          {user.isLoading ? (
            <ClipLoader color="white" loading={true} size={26} />
          ) : (
            "Register"
          )}
        </button>
      </form>
      <p className="help-text">
        Already have account ?
        <Link to="/login">
          <span className="link-go mx-3">Login</span>
        </Link>
      </p>
      <p className="help-text">
       Want to browse without login ?
        <Link to="/explore">
          <span className="link-go mx-3">Explore</span>
        </Link>
      </p>
      </div>
    </div>
  );
};

export default Register;
