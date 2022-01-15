import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import './Login.css';
import MapMenu from './MapMenu';

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 const Login = ({ setToken, token }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  console.log("1234 " + token);

  if(token) {
    return (
      <Navigate to="/"/>
    );
  }
  

  const handleSubmit = async e => {
    e.preventDefault();
    const retBody = await loginUser({
      email: username,
      password
    });
    setToken(retBody.token);

  }
    return (
      
        <div className="card shadow mb-4 mx-auto text-center" style={{ width: '22rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#57abd1' }}>
          <div className="card-body">
              <h4 className="card-title mb-0 border-bottom font-weight-bold"> Login</h4>
          </div>
                  
          <div className="card-body text-center">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input type="text" className="form-control" placeholder="Enter username" onChange={e => setUserName(e.target.value)}/>
              
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </div>
            
            <button type="submit" className="btn btn-dark">Submit</button>
          </form>

            
          </div>
          <div className="card-footer">
            <small className="text-muted">
                Don't have an account?
                <a className="ml-2" href="/register">
                    Register
                </a>
            </small>    
          </div>
        </div>   
    );
  }

export default Login;