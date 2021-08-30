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
