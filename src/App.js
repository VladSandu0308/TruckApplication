import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Map } from "@esri/react-arcgis";
import Truck from './Truck.js';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import MapMenu from './MapMenu';
import Login from './Login'
import Register from './Register';
import Logout from './components/Logout';
import Account from './Account';
import ClientsRequests from './Requests';

import useToken from './hooks/useToken';
import useRole from './hooks/useRole';
import useName from './hooks/useName';
import GenericReq from './components/GenericReq';





function App() {

    const { ApiKey } = require("@esri/arcgis-rest-auth");
    const { addFeatures, updateFeatures, deleteFeatures } = require("@esri/arcgis-rest-feature-layer");
    const title = "Truck"

    const { token, setToken } = useToken();
    const { role, setRole } = useRole();
    const { name, setName} = useName();
    
  return (

  <div className="App">
    <Navbar token={token}/>
    <div className="content">
      <Routes>
        <Route exact path="/" element = {<Home token={token}/>}/>
        <Route path="/map" element = {<MapMenu token={token}/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/login" element = {<Login setToken={setToken} token={token} setRole={setRole} setName={setName}/>}/>
        <Route path="/account" element = {<Account setToken={setToken} token={token} role={role} name={name}/>}/>
        <Route path="/logout" element = {<Logout setToken={setToken} token={token}/>}/>
        <Route path="/requests" element = {<GenericReq role={role}/>}/>

      </Routes>
    </div>
</div>
  );
}

export default App;