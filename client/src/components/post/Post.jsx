import "./post.css"
import {Link} from "react-router-dom"

export default function Post({post}) {//post is a particular post 
  return (
    <div className="post">
      
      <img className="postImg" src="ttps://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-260nw-1029506242.jpg" alt="" />
      <div className="postInfo">
        <div className="postCats">{
          post.categories.map(c=>(
            <span className="postCat">{c}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link"> {/*now when we press title of a blog then we are redirected to a new page that consists of details of that blog in url the postId of that post will get added*/}
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr/>
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>{/*shows when the post was created */}
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  )
}
