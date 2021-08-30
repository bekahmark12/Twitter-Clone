import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserInfo() {
  const [user, setUser] = useState(null);
  let token = localStorage.getItem('token');

  const getUser = async () => {
    try {
      const user = await axios.get(
        "http://localhost:8080/api/users/",
        { headers: { "Authorization": token } })
        .then(response => {
          setUser(response.data)
        }).catch(err => {
          console.log(err.data)
        });
    } catch (err) {
      if (err.response) {
        return err.response.data;
      }
      console.log(err.response)
      return { error: "Unexpected Error getting logged in user" };
    }
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUser();
    }
    return () => mounted = false;
  }, [])

  if (!user) {
    return <h1>Loading User...</h1>
  }

  return (
    <>
      <Topbar />
      <div className="profile">

        
      </div>
    </>
  );
}
