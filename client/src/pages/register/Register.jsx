import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function Register() {
  const [username, setUsername] = useState(""); //username is a string thus double quotes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        "https://blogging-zx1s.onrender.com/api/auth/register",
        {
          username, //when we have x: x type of situation then just write x
          email,
          password,
        } // we pass an object containing username,email,password like we used to do in postman
      );
      // console.log(res.data)
      if (res.data) {
        window.location.replace("/login"); // means if there is no error in registration then this redirects the usser to login page
      }
    } catch (err) {
      setError(true); //error generated if some error occurs or same username/email used
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        {" "}
        {/*we have defined onSubmit which means on submitting this form handleSubmit fn will be executed */}
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)} //so whenever we write something in input field then the
          // setUsername automatically updates the value of username to that(what we write in username)
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span>Something Went Wrong!</span>}
    </div>
  );
}
