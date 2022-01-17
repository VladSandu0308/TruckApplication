import Navbar from "./Navbar";
import { Map } from "@esri/react-arcgis";
import Truck from './Truck.js';
const MapMenu = () => {
return (
    <div>
    <div style={{ width: '100vw', height: '90vh'}} className="App">
        <Map 
            viewProperties={{center: [26, 45]}}>
                
            <Truck x={26} y={45}/>
            </Map>
    </div>
    </div>
   

);}
export default MapMenu;