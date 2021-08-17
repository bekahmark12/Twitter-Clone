import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import React, { useEffect, useState } from "react";
import axios from "axios";



const Feed = () => {
  
const getAllPosts = async () => {
  try {
      const posts = await axios.get(
          "http://localhost:8080/api/post/", 
          { headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyVHlwZSI6MCwiVXNlcm5hbWUiOiJ0ZXN0IiwiZXhwIjoxNjI4ODE2NjE0LCJpc3MiOiJ1c2Vycy1zZXJ2aWNlIn0.dhnWNRHgdSuT0wkPGcR9ZyLkhpQAM5VCv7BujecJ4iE" }}
          ).then(response => {
            console.log(response.data)
            setPosts(response.data)
          }).catch(err => {
            console.log(err.data)
          });
  } catch (err) {
      if (err.response) {
          return err.response.data;
      }
      return {error: "Unexpected Error"};
  }
}

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
        getAllPosts();
    }
    return () => mounted = false;
  }, [])
  
  if(!posts){
    return <h1>Loading...</h1>
  }

  console.log(posts);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
