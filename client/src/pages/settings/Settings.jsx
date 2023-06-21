import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useState } from "react";
import axios from "axios";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useContext(Context); //using contextAPI i am directly getting details of currently logged in user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    try {
      await axios.put(
        "https://blogging-zx1s.onrender.com/api/users/" + user._id,
        updatedUser
      );
      setSuccess(true);
    } catch (err) {}
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src="https://www.mensjournal.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_700/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.webp"
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-circle-user"></i>
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* these oncahnge fn calls the setUsername fn which automatically updates the value of username*/}
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been Updated...{" "}
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
