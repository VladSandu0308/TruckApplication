import logo from './logo.svg';
import './App.css';
import { Map } from "@esri/react-arcgis";
import Truck from './Truck.js';
import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

    const { ApiKey } = require("@esri/arcgis-rest-auth");
    const { addFeatures, updateFeatures, deleteFeatures } = require("@esri/arcgis-rest-feature-layer");
    const title = "Truck"

  return (
    <div>
    <div> <Navbar   /></div>
    <div style={{ width: '100vw', height: '90vh'}} className="App">
        <Map 
            viewProperties={{center: [26, 45]}}>
            <Truck x={26} y={45}/>
            </Map>
    </div>
    </div>
  );
}

export default App;