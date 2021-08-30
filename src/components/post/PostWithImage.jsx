import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { TextField, IconButton } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Users } from "../../dummyData";
import { useState } from "react";
import axios from "axios";
import Comment from "../comment/Comment"
import AddBoxIcon from '@material-ui/icons/AddBox';

export default function PostWithIMage({ post }) {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [postBody, setPostBody] = useState(null);

  const handleClickAway = () => {
    setShowCommentInput(false);
  }

  const commentSubmitHandler = async(e) => {
    e.preventDefault();
    try{
      const result = await axios.post(
        `http://localhost:8080/api/post/${post.ID}`,
        JSON.stringify(
          {
            "post_body": postBody,
          }
        ), {headers: {"Content-Type": "application/json", "Authorization": localStorage.getItem("token") }});
        setShowCommentInput(false);
        return {succeeded: true, data: result.data}
      } catch(err) {
      if(err.response) {
        return{succeeded: false, data: err.response}
      }
      return {succeeded: false, data: "error sending the post creation."}
    }
        
  }

  const likeHandler = async (e) => {
    e.preventDefault();
    console.log(post)
    try {
      const result = await axios.patch(
        `http://localhost:8080/api/post/${post.ID}/like`,
        null,
        { headers: { "Authorization": localStorage.getItem("token") } });
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
          <img className="postImg" src={post.image_uri} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{post.num_likes} people like it</span>
          </div>
          <div className="postBottomRight">
            <div className={showCommentInput ? "postCommentTextHidden" : "postCommmentText"} onClick={() => setShowCommentInput(true)}>
              <AddCircleIcon />
              <span>{post.comment} comment</span>
            </div>
            <div className={showCommentInput ? "commentInput" : "commentInputHidden"}>
              <form onSubmit={commentSubmitHandler}>
                <TextField id="outlined-basic" label="Add a comment:" variant="outlined"  onChange={(e) => setPostBody(e.target.value)} />
                <IconButton type="submit">
                  <AddBoxIcon style={{ fontSize: 38, padding: '5px' }} type="submit"/>
                  </IconButton>
              </form>

            </div>
          </div>
        </div>
        <div className="postBottom2">
          <label>Comments:</label>
        </div>
        <div className="postBottom2">
          {post.comments.map((c) => (
            <Comment key={c.ID} post={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
