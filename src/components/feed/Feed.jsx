import PostImage from "../post/PostWithImage";
import PostNoImage from "../post/PostNoImage";
import Share from "../share/Share";
import "./feed.css";
import React, { useEffect, useState } from "react";
import axios from "axios";



const Feed = () => {
const [posts, setPosts] = useState(null);

var token = localStorage.getItem('token')

const getAllPosts = async () => {
  try {
      const posts = await axios.get(
          "http://localhost:8080/api/post/feed", 
          { headers: {"Authorization": token}}
          ).then(response => {
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

  

  useEffect(() => {
    let mounted = true;
    if (mounted) {
        getAllPosts();
    }
    return () => mounted = false;
  }, [])
  
  if(!posts){
    return <h1>Loading Posts...</h1>
  }

  console.log(posts);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          p.image_uri != null ? 
          <PostImage key={p.ID} post={p} /> : <PostNoImage key={p.ID} post={p}/>
        ))}
      </div>
    </div>
  );
}

export default Feed;
