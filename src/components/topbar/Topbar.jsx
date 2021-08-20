import "./topbar.css";
import React from 'react';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { BrowserRouter as Router, NavLink, Link, Redirect, Switch } from "react-router-dom";

export default function Topbar() {
  // const setHomeRoute = () => {
  //   if(localStorage.getItem('loggedIn')) {
  //     return '/home'
  //   }
  //   return '/login'
  // }

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
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/>
      </div>
    </div>
    
  );
}
