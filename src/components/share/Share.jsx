import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons";
import {TextField} from "@material-ui/core"
import axios from "axios";
import React, {useState, useEffect} from 'react'

export default function Share() {
  const [user, setUser] = useState(null);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [postBody, setPostBody] = useState(null);
  let token = localStorage.getItem('token');

  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      const result = await axios.post(
        "http://localhost:8080/api/post/",
        JSON.stringify(
          {
            "post_body": postBody,
            "image_uri": imageUrl
          }
        ), {headers: {"Content-Type": "application/json", "Authorization": localStorage.getItem("token") }});
          return {succeeded: true, data: result.data}
      } catch(err) {
      if(err.response) {
        return{succeeded: false, data: err.response}
      }
      return {succeeded: false, data: "error sending the post creation."}
    }
        
  }

  const getUser = async () => {
    try {
      const user = await axios.get(
        "http://localhost:8080/api/users/",
        { headers: { "Authorization": token }})
        .then(response => {
          setUser(response.data)
        }).catch(err => {
          console.log(err.data)
        });
    } catch (err) {
      if (err.response) {
        return err.response.data;
      }
      console.log(err.response)
      return { error: "Unexpected Error getting logged in user"};
    }
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
        getUser();
    }
    return () => mounted = false;
  }, [])
  
  if(!user){
    return <h1>Loading User...</h1>
  }
  const ph = `What's on your mind ${user.name}?`

  return (
    <form onSubmit={submitHandler}>
    <div className={showImageInput ? "share" : "share2"}>
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profile_uri} alt="" />
          <input
            value={postBody}
            placeholder={ph}
            className="shareInput"
            onChange={(e) => setPostBody(e.target.value)}
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption" onClick={() => setShowImageInput(true)}>
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </div>
        <div className={showImageInput ? "showImageInput" : "hideImageInput"} id="imageURLInput">
          <TextField value={imageUrl} id="standard-basic" label="Image URL:" onChange={(e) => setImageUrl(e.target.value)} />
        </div>
      </div>
    </div>
    </form>
  );
}
