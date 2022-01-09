import logo from './logo.svg';
import './App.css';
import { Map } from "@esri/react-arcgis";
import Truck from './Truck.js';

function App() {

    const { ApiKey } = require("@esri/arcgis-rest-auth");
    const { addFeatures, updateFeatures, deleteFeatures } = require("@esri/arcgis-rest-feature-layer");

  return (
    <div style={{ width: '100vw', height: '100vh'}} className="App">
        <Map 
            viewProperties={{center: [26, 45]}}>
            <Truck x={26} y={45}/>
            </Map>
    </div>
  );
}

export default App;