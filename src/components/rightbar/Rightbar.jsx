import "./rightbar.css";
import Online from "../online/Online";
import React, { useEffect, useState } from "react";
import UserClient from "../../APIClients/UserClient";
import axios from "axios";



export default function Rightbar({ profile, user: _user }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(_user);
  }, [_user])

  const HomeRightbar = ({user}) => {
    
    const [friends, setFriends] = useState(null);
    let token = localStorage.getItem('token');
  
    const getFollowing = async () => {
      try {
        const following = await axios.get(
          `http://localhost:8080/api/users/${user.name}`,
          { headers: { "Authorization": token }})
          .then(response => {
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
            <Online key={f.ID} user={f} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = ({user}) => {
  const [friends, setFriends] = useState(null);
  let token = localStorage.getItem('token');

  const getFollowing = async () => {
    try {
      const following = await axios.get(
        `http://localhost:8080/api/users/${user.name}`,
        { headers: { "Authorization": token }})
        .then(response => {
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
          <div className="rightbarFollowing" key={f.ID}>
            <img
              key={f.ID}
              src={f.profile_uri}
              alt="profile here"
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">{f.name}</span>
          </div>
        ))}
      </div>

     
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar user={user}/> : <HomeRightbar user={user}/>}
      </div>
    </div>
  );
}
