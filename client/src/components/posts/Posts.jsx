import "./posts.css"
import Post from "../post/Post"
export default function Posts({posts}) {//posts is an array/object(collection of all posts in database)
  return (
    <div className='posts'>
      {posts.map(p=>(//This JSX expression uses the map() function to iterate over each element in the posts array and generate a <Post> component for each post.
          <Post post={p}/>
      ))}
    </div>   
  )
}
