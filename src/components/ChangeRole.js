import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

async function updateRole(credentials) {
  return fetch('http://localhost:8080/updateUserRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const ChangeRole = ({name}) => {

  const [role, setRole] = useState();
  
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(name);
    const retBody = await updateRole({
      name,
      role
    });

  }

  return (
    <div className="card shadow mb-4 mx-auto" style={{ width: '22rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#c4d6b0' }}>
    
      <div className="card-body text-center">
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
            <label>Select new role</label>
            <select class="form-select" onChange={e => setRole(e.target.value)}>
              <option selected>Select role</option>
              <option value="Client">Client</option>
              <option value="Transporter">Transporter</option>
            </select>
        </div>   
        <button type="button" className="btn btn-dark" onClick={handleSubmit}>Change Role! {}</button>
      </form>

      </div>  
  </div>
  )
}
export default ChangeRole
