import "./topbar.css";
import React from 'react';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";

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
      <Router>
        <div className="topbarLinks">
       
          <NavLink to='/login' className='topbarLink'>Login</NavLink>
          <NavLink to='/home'className='topbarLink'>Home</NavLink>
        </div>
        </Router>
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
