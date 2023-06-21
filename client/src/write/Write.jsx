import { useState, useContext } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [file,setFile] = useState(null)
  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    try {
      const res = await axios.post(
        "https://blogging-zx1s.onrender.com/api/posts",
        newPost
      );
      window.location.replace(
        "https://blogging-site.netlify.app/post/" + res.data._id
      );
    } catch (err) {}
  };
  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://www.shutterstock.com/image-photo/panorama-beautiful-countryside-romania-sunny-260nw-1302294157.jpg"
        alt=""
      />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/*it will update the value of title */}
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
