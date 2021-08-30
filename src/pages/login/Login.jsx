import React, { createRef, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { Form, InputGroup, FormControl } from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './login.css'
import TopbarNLI from '../../components/topbar/TopbarNotLoggedIn'
import UserClient from '../../APIClients/UserClient'
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";


const Login = () => {

  console.log('you hit the login!')
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    console.log('handleSubmit')
    event.preventDefault();
    try {
      const resp = await UserClient.getBearerToken({ username, password });
      console.log(resp)
      if(resp.status != 200){
        return setShowAlert(true);
      }
      console.log('resp', resp.data)
      if (resp.data.hasOwnProperty('token')) {
        localStorage.setItem('token', `Bearer ${resp.data.token}`);
        localStorage.setItem('loggedIn', true);
        history.push('/')
      }    
    } catch (err) {
      setShowAlert(true);
      console.log('there was an error')
      console.error(err)
    }
  }

  return (
    <>
      <TopbarNLI />
      <form className="form" onSubmit={handleSubmit}>

        <InputGroup className="mb-3" className="input" controlId="username">
          <InputGroup.Text id="basic-addon1">Username:</InputGroup.Text>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3" className="input" controlId="password">
          <InputGroup.Text id="basic-addon1" >Password:</InputGroup.Text>
          <FormControl
            placeholder="Password"
            aria-describedby="basic-addon2"
            autoFocus
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <div className={showAlert ? "show-alert-class alert alert-danger" : "hide-alert-class"} role="alert">
          Invalid username or password!
        </div>
        <button type="submit" class="btn btn-outline-secondary">Sign In</button>
      </form>

    </>
  );

}

export default Login;