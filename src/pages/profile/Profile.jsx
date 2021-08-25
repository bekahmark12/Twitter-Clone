import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  let token = localStorage.getItem('token');

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

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.cover_uri}
                alt="cover uri"
              />
              <img
                className="profileUserImg"
                src={user.profile_uri}
                alt="profile uri"
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.name}</h4>
                <span className="profileInfoDesc">Hey friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed/>
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
