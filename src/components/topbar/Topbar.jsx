import "./topbar.css";
import React, { useEffect, useState } from 'react';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import axios from "axios";


export default function Topbar() {
  const [user, setUser] = useState(null);
  let token = localStorage.getItem('token');

  const getUser = async () => {
    try {
      const user = await axios.get(
        "http://localhost:8080/api/users/",
        { headers: { "Authorization": token }})
        .then(response => {
          console.log(response.data)
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
   
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">NEUMONT NETWORK</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">

        <div className="topbarLinks">
          <a href='/login'  className='topbarLink'>Login</a>
          <a href={localStorage.getItem('loggedIn') ? '/home' : '/login'} className='topbarLink'>Home</a>
          <a href={localStorage.getItem('loggedIn') ? '/feed' : '/login'} className='topbarLink'>Feed</a>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src={user.profile_uri} alt="" className="topbarImg"/>
      </div>
    </div>
    
  );
}
