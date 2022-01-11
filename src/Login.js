import React, { useState } from 'react';
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

const Login = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState(0);

  const handleSubmit = async e => {
    e.preventDefault();
    const retBody = await loginUser({
      email: username,
      password
    });
    console.log(retBody.token);
    setToken(retBody.token);

  }
    return (
      
      <>
      {token != 0 ? (
        <MapMenu/>
      ) : (
        <div className="login-wrapper">
          <h1>Please Log In</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Email</p>
              <input type="text" onChange={e => setUserName(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
        
      </>
      
    );
  }

export default Login;