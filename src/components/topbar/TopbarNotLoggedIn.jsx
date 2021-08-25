import "./topbar.css";
import React, { useEffect, useState } from 'react';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import axios from "axios";


export default function Topbar() {

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
        <img src={"https://i.pinimg.com/564x/9a/e5/c2/9ae5c20f9349e872f05e9feead42b64e.jpg"} alt="" className="topbarImg"/>
      </div>
    </div>
    
  );
}
