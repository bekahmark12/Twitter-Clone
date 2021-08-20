import "./rightbar.css";
import Online from "../online/Online";
import React, { useEffect, useState } from "react";
import UserClient from "../../APIClients/UserClient";
import axios from "axios";



export default function Rightbar({ profile }) {

  const HomeRightbar = () => {
    const [friends, setFriends] = useState(null);
    let token = localStorage.getItem('token');
  
    const getFollowing = async () => {
      try {
        const following = await axios.get(
          "http://localhost:8080/api/users/bekah",
          { headers: { "Authorization": token }})
          .then(response => {
            console.log(response.data)
            setFriends(response.data)
          }).catch(err => {
            console.log(err.data)
          });
      } catch (err) {
        if (err.response) {
          return err.response.data;
        }
        console.log(err.response)
        return { error: "Unexpected Error getting following"};
      }
    }

    useEffect(() => {
      let mounted = true;
      if (mounted) {
        getFollowing();
      }
      return () => mounted = false;
    }, [])

    if (!friends) {
      return <h2>Loading Friends...</h2>
    }
    
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((f) => (
            <Online key={f.id} user={f} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
  const [friends, setFriends] = useState(null);
  let token = localStorage.getItem('token');

  const getFollowing = async () => {
    try {
      const following = await axios.get(
        "http://localhost:8080/api/users/bekah",
        { headers: { "Authorization": token }})
        .then(response => {
          console.log(response.data)
          setFriends(response.data)
        }).catch(err => {
          console.log(err.data)
        });
    } catch (err) {
      if (err.response) {
        return err.response.data;
      }
      console.log(err.response)
      return { error: "Unexpected Error getting following"};
    }
  }

    useEffect(() => {
      let mounted = true;
      if (mounted) {
        getFollowing();
      }
      return () => mounted = false;
    }, [])

    if (!friends) {
      return <h2>Loading Friends...</h2>
    }

    return (
      <>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        {friends.map((f) => (
          <div className="rightbarFollowing" key={f.id}>
            <img
              src={f.profile_uri}
              alt="profile here"
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">{f.name}</span>
          </div>
        ))}
      </div>

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
