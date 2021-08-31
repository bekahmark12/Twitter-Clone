import "./topbar.css";
import React, { useEffect, useState } from 'react';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import axios from "axios";
import NotificationDD from '../notificationMenu/NotificationDropDn'

/// @ts-ignore
const io = require('socket.io-client')
const cron = require('node-cron')


export default function Topbar({ user: _user }) {

  const [user, setUser] = useState(null);
  let token = localStorage.getItem('token');
  const [socket, setSocket] = useState(null);
  const [notificationsCount, setNotificationsCount] = useState(0)
  const [notificationList, setNotificationList] = useState([]);

  if (notificationList == null || notificationsCount == 0) {
    localStorage.setItem('notifications', false)
  }

  const lsLoggedIn = localStorage.getItem('loggedIn')

  useEffect(() => {
    setUser(_user);
  }, [_user])

  useEffect(() => {
    if (!lsLoggedIn) {
      return;
    } else {
      const newSocket = io("http://localhost:8080", { path: '/api/notifications/socket.io' })
      setSocket(newSocket);

      console.log('you are in the socket useEffect')

      return () => newSocket.close();
    }
  }, [setSocket, lsLoggedIn]);


  if (socket) {
    socket.on("connect", () => {
      console.log("socket connected")
    })

    socket.on('authorization', (msg) => {
      console.log("socket auth", msg)
      socket.emit('request', localStorage.getItem('token'))
    }
    )

    // cron.schedule(5, () => {
    //   console.log('CRON TEST YO!')
    // })

    socket.on('notification', (msg) => {
      console.log('you hit the socket.on!', msg)
      setNotificationList([...notificationList, msg])
      setNotificationsCount(notificationsCount + 1)
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected")
    })
  }


  if (!user) {
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
          <a href='/login' className='topbarLink'>Login</a>
          <a href={localStorage.getItem('loggedIn') ? '/home' : '/login'} className='topbarLink'>Home</a>
          <a href={localStorage.getItem('loggedIn') ? '/feed' : '/login'} className='topbarLink'>Feed</a>
        </div>



        <div className="topbarIcons">
          <div className="topbarIconItem">
            <NotificationDD notificationList={notificationList} />
            <span className="topbarIconBadge">{notificationsCount}</span>
            {/* // onClick=toggle a flag: open (setState) */}

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
        <a href='user-info'>
          <img src={localStorage.getItem('loggedIn') ?
            user.profile_uri : 'https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600w-1095249842.jpg'}
            alt="" className="topbarImg" />
        </a>
      </div>
    </div>

  );
}
