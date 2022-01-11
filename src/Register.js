import React, { useState } from 'react';
import Login from './Login'

async function register(credentials) {
  return fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [name, setName] = useState();
  const [token, setToken] = useState(0);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(name);
    const retBody = await register({
      name,
      email,
      password,
      role
    });

    setToken(retBody);

  }
    return (
        <>
        {token != 0 ? (
          <Login />
        ) : (
          <div className="login-wrapper">
            <h1>Register account</h1>
            <form  onSubmit={handleSubmit}>
              <label>
                <p>Nume</p>
                <input type="text"  onChange={e => setName(e.target.value)}/>
              </label>
              <label>
                <p>E-mail</p>
                <input type="text"  onChange={e => setEmail(e.target.value)}/>
              </label>
              <label>
                <p>Rol</p>
                <input type="text"  onChange={e => setRole(e.target.value)}/>
              </label>
              <label>
                <p>Password</p>
                <input type="password"  onChange={e => setPassword(e.target.value)}/>
              </label>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        )}
        </>
    
    );}
    export default Register;