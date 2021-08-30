import React, { createRef, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { Form, InputGroup, FormControl } from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './about.css'
import Topbar from '../../components/topbar/Topbar'
import UserClient from '../../APIClients/UserClient'
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";


const Login = ({user}) => {

  console.log('you hit the login!')
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState("")




  async function handleSubmit(event) {
    console.log('handleSubmit')
    // event.preventDefault();
    // try {
    //   const resp = await UserClient.getBearerToken({ username, password });
    //   console.log(resp)
    //   if(resp.status != 200){
    //     return setShowAlert(true);
    //   }
    //   console.log('resp', resp.data)
    //   if (resp.data.hasOwnProperty('token')) {
    //     localStorage.setItem('token', `Bearer ${resp.data.token}`);
    //     localStorage.setItem('loggedIn', true);
    //     history.push('/')
    //   }    
    // } catch (err) {
    //   setShowAlert(true);
    //   console.log('there was an error')
    //   console.error(err)
    // }
  }

  return (
    <>
      <Topbar user={user}/>
      <form className="form" onSubmit={handleSubmit}>

        <InputGroup className="mb-3" className="input" controlId="username">
          <InputGroup.Text id="basic-addon1">Username:</InputGroup.Text>
          <FormControl
            placeholder={user.user_name}
            aria-label="Username"
            aria-describedby="basic-addon1"
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3" className="input" controlId="name">
          <InputGroup.Text id="basic-addon1" >Name:</InputGroup.Text>
          <FormControl
            placeholder={user.name}
            aria-describedby="basic-addon2"
            autoFocus
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3" className="input" controlId="email">
          <InputGroup.Text id="basic-addon1" >Email:</InputGroup.Text>
          <FormControl
            placeholder="Password"
            aria-describedby="basic-addon2"
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
       
        <button type="submit" class="btn btn-outline-secondary">Save</button>
      </form>

    </>
  );

}

export default Login;