import "./profile.css";
import TopbarNLI from "../../components/topbar/TopbarNotLoggedIn";
import SideBarNLI from "../../components/sidebar/SideBarNotLoggedIn";
import Feed from "../../components/feed/Feed";
import RightbarNLI from "../../components/rightbar/RightbarNotLoggedIn";
import React, { useEffect, useState } from "react";

export default function ProfileNotLoggedIn() {

  return (
    <>
      <TopbarNLI />
      <div className="profile">
        <SideBarNLI />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <RightbarNLI profile/>
          </div>
        </div>
      </div>
    </>
  );
}
