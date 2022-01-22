import Navbar from "./Navbar";
import { Map } from "@esri/react-arcgis";
import Truck from './Truck.js';
import {useEffect, useState} from "react";

const MapMenu = ({ name, role }) => {

    const [trucks, setTrucks] = useState([]);

    useEffect(() => {fetch(
        'http://localhost:8080/getContracts')
        .then((res) => res.json())
        .then((data) => setTrucks(data))
    }, [])


return (


    <div>
    <div style={{ width: '100vw', height: '90vh'}} className="App">
        <Map 
            viewProperties={{center: [26, 45]}}>
            
            {trucks.filter((item) => { return item.t_username === name || item.c_username === name || role === "Admin"}).map((item) => (

                <Truck dep_place={item.dep_place} int_place={item.int_place} arival_place={item.arival_place} arival_date={item.arival_date} dep_date={item.dep_date} id={item.transporter}/>
                
                ))

                
            
            }
            </Map>
    </div>
    </div>
   

);}
export default MapMenu;