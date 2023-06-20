import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef(); //now we have also set ref={userRef} in input tag of username,so when user enters username then it will be stored in userRef object
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context); //using context api beacuse we have passed same parameters in context.js
  // console.log(userRef)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" }); //refer reducer.js to know what happens when type:LOGIN_START
    try {
      const res = await axios.post(
        "https://blogging-zx1s.onrender.com/api/auth/login",
        {
          username: userRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data }); //defined in reducer.js,this is contextapi part
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" }); //context api part
    }
  };
  // console.log(isFetching)
  // console.log(user)
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
