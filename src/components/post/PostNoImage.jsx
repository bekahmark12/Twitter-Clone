import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useState } from "react";
import axios from "axios";

export default function PostNoImage({ post }) {

  const likeHandler = async(e) => {
    e.preventDefault();

    try {
      const result = await axios.patch(
        `http://localhost:8080/api/post/${post.ID}/like`,
        null,
        { headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("token") } });
      return { succeeded: true, data: result.data }
    } catch (err) {
      if (err.response) {
        return { succeeded: false, data: err.response }
      }
      return { succeeded: false, data: "error sending the patch like request." }
    }
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={post.author_uri}
              alt=""
            />
            <span className="postUsername">
              {post.author}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.post_body}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{post.num_likes} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
