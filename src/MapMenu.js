import Navbar from "./Navbar";
import { Map } from "@esri/react-arcgis";
import Truck from './Truck.js';
import {useEffect, useState} from "react";

const MapMenu = () => {

    const [trucks, setTrucks] = useState([]);
    const [finished, setFinished] = useState(0);

    useEffect(() => {fetch(
        'http://localhost:8080/getTransporters')
        .then((res) => res.json())
        .then((data) => setTrucks(data))
    }, [])


return (


    <div>
    <div style={{ width: '100vw', height: '90vh'}} className="App">
        <Map 
            viewProperties={{center: [26, 45]}}>
            
            {trucks.map((item) => (

                <Truck dep_place={item.dep_place} arival_place={item.arival_place} arival_date={item.arival_date} dep_date={item.dep_date} id={item.t_id}/>
                
                ))
            
            }
            </Map>
    </div>
    </div>
   

);}
export default MapMenu;