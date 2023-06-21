import "./singlePost.css";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function SinglePost() {
  const location = useLocation();
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  //console.log(location.pathname) ==>  //url=> localhost:3000/x so this gives us x for the current post
  const path = location.pathname.split("/")[2]; //path variable stores the id of a particular blog that we are viewing

  const [post, setPost] = useState({}); //The post variable will hold the data fetched from the server and The setPost function is a setter function provided by the useState hook to update the value of posts
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        "https://blogging-zx1s.onrender.com/api/posts/" + path
      ); //getPost is an asynchronous function that sends an HTTP GET request to the specified URL
      setPost(res.data); //setPost updates the value of post
      //initially post is empty object/array
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]); //DOUBT WHY WE WRITE SOMETHING IN BRACKETS like [path]
  const handleDelete = async () => {
    try {
      await axios.delete(
        "https://blogging-zx1s.onrender.com/api/posts/" + path,
        { data: { username: user.username } }
      );
      window.location.replace("https://blogging-site.netlify.app/");
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.put("https://blogging-zx1s.onrender.com/api/posts/" + path, {
        username: user.username,
        title: title,
        desc: desc,
      });
      // window.location.reload()
      setUpdateMode(false); //as now we have to again set the updateMode back to false as when user press the update button
    } catch (err) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          src="https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-260nw-1029506242.jpg"
          alt=""
          className="singlePostImg"
        />
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitle"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && ( // checking if the logged in user is the writer of the blog that he currently viewing as then only he can delete and update that blog
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                {/*on clicking this edit option the updateMode is set to true */}
                <i
                  className="singlePostIcon fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
            {/*when we are viewing a particular blog then username is also displayed who made it 
              so we can press the username and get all the blogs of that user*/}
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>{" "}
          {/*tells when the blog was created*/}
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">
            {/*updating the posts description*/}
            {desc}
          </p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
