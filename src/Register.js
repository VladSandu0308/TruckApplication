import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
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
  const [phone, setPhone] = useState()
  const [role, setRole] = useState();
  const [name, setName] = useState();
  const [token, setToken] = useState(0);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(name);
    const retBody = await register({
      name,
      email,
      phone,
      password,
      role
    });

    setToken(retBody);

  }
    return (
        <>
        {token != 0 ? (
          <Navigate to="/login"/>
        ) : (
          <div className="card shadow mb-4 mx-auto text-center" style={{ width: '22rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#57abd1' }}>
            <div className="card-body">
                <h4 className="card-title mb-0 border-bottom font-weight-bold"> Register</h4>
            </div>
                    
            <div className="card-body text-center">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Enter username" onChange={e => setName(e.target.value)}/>
                
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Phone number" onChange={e => setPhone(e.target.value)}/>
              </div>

              <div className='form-group'>
                <label>Role</label>
                <select class="form-select" onChange={e => setRole(e.target.value)}>
                  <option selected>Select role</option>
                  <option value="Client">Client</option>
                  <option value="Transporter">Transporter</option>
                </select>
              </div>
              
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>

              
            </div>
            <div className="card-footer">
              <small className="text">
                  Already have an account?
                  <a className="ml-2" href="/login">
                      Sign In
                  </a>
              </small>    
            </div>
          </div>
        )}
        </>
    
    );}
    export default Register;