import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserClient from "../../APIClients/UserClient"

export default function Profile({user: _user}) {
  const [user, setUser] = useState(_user ? _user : null);
  let token = localStorage.getItem('token');

  useEffect(() => {
    let mounted = true;
    if (mounted && !user) {
      UserClient.getUser((user, error) => {
        if(error) {
          console.log(error);
        } else {
          setUser(user);
        }
      });
    }
    return () => mounted = false;
  }, [])

  console.log(user)

  if (!user) {
    return <h1>Loading User...</h1>
  }

  return (
    <>
      <Topbar user={user}/>
      <div className="profile">

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
          <div className="feedWrapper">
            <>
            <div className="profileRightBottom">
              <Feed user={user}/>
              <Rightbar profile user={user} />
            </div>
            </>
          </div>

        </div>
      </div>
    </>
  );
}
