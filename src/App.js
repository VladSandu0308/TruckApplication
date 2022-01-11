import logo from './logo.svg';
import './App.css';
import { Map } from "@esri/react-arcgis";
import Truck from './Truck.js';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import MapMenu from './MapMenu';
import Login from './Login'
import Register from './Register';



function App() {

    const { ApiKey } = require("@esri/arcgis-rest-auth");
    const { addFeatures, updateFeatures, deleteFeatures } = require("@esri/arcgis-rest-feature-layer");
    const title = "Truck"

  return (

  <div className="App">
  <Navbar />
  <div className="content">
    <Routes>
      <Route exact path="/" element = {<Home/>}/>
      <Route path="/map" element = {<MapMenu/>}/>
      <Route path="/register" element = {<Register/>}/>
      <Route path="/login" element = {<Login/>}/>
      

    </Routes>
  </div>
</div>
  );
}

export default App;