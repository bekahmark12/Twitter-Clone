import "./rightbar.css";
import Online from "../online/Online";
import React, { useEffect, useState } from "react";
import UserClient from "../../APIClients/UserClient";
import axios from "axios";



export default function RightbarNotLoggedIn({ profile }) {

  const HomeRightbar = () => {
    
    return (
      <>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
      </>
    );
  };

  const ProfileRightbar = () => {

    return (
      <>

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
