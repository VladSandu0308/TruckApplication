import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

async function postRequest(credentials) {
  return fetch('http://localhost:8080/contract', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const Logout = () => {

  const [location, setLocation] = useState();
  const [created, setCreated] = useState(0);

  const price = 350;

  const {state} = useLocation();

  const handleSubmit = async e => {
    e.preventDefault();

    let retBody, myLocation;
    
    if (location == undefined) {
      myLocation = state.dep_place;
    } else {
      myLocation = location;
    }
    
    if (state.myself === "Client") {
      retBody = await postRequest({
        trans: state.transporter,
        client: state.client,
        dep_place: state.dep_place,
        int_place: myLocation,
        arival_place: state.arival_place,
        price: price,
        pay_deadline: state.pay_deadline.split("T")[0],
        t_id: state.id
      });
    } else {
      retBody = await postRequest({
        trans: state.transporter,
        client: state.client,
        dep_place: myLocation,
        int_place: state.dep_place,
        arival_place: state.arival_place,
        price: price,
        pay_deadline: state.pay_deadline.split("T")[0],
        c_id: state.id
      });
    }

    console.log(retBody.message);

    if (retBody.message.startsWith("The request was posted") ) {
      console.log("Error:" + JSON.stringify(retBody));
      setCreated(1); 
    }
    
  }

  if (created) {
    return (
      <Navigate to="/map"/>
    )
    
  }

  

  return (
    <div className="card shadow mb-4 mx-auto" style={{ width: '22rem', maxHeight: '40rem', marginTop: '5%', backgroundColor: '#57abd1' }}>
    
      <div className="card-body text-center">
          <h6 className="card-title border-bottom mb-2 font-weight-bold">Are you sure you want to accept?</h6>
          <div className="form-group mb-3">
            
            <label>Where?</label>
            <input type="text" className="form-control" placeholder="Location" onChange={e => setLocation(e.target.value)}/>
          </div>   
          <button type="button" className="btn btn-dark" onClick={handleSubmit} >Generate contract</button>

      </div>  
  </div>
  )
}
export default Logout
