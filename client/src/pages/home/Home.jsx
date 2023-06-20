import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function Home() {
  const [posts, setPosts] = useState([]); //The posts variable will hold the data fetched from the server and The setPosts function is a setter function provided by the useState hook to update the value of posts.as initilally posts is assigned [] empty array
  const location = useLocation();
  // console.log(location)
  const search = location.search;
  useEffect(() => {
    const fetchPosts = async () => {
      //fetchPosts is an asynchronous function that sends an HTTP GET request to the specified URL
      const res = await axios.get(
        "https://blogging-zx1s.onrender.com/api/posts" + search
      ); //matlab frontend se backend ko request bhejta jisse ham databse ko access kar paate hain and other things also
      setPosts(res.data); //setPosts updates the value of posts, initially post is empty object/array
      // console.log(typeof(posts))
      //basic use of search is that when search is empty then all the posts of all the users will be shown
      //if search=?user=john then only the posts of john will be shown
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} /> {/*passing props through the Posts component */}
        <Sidebar />
      </div>
    </>
  );
}
