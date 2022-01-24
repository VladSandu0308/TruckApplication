import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { loadModules } from "esri-loader";

function getLocation(place) {
    return loadModules(["esri/config", "esri/rest/locator"]).then(([esriConfig, locator]) => {
        esriConfig.apiKey = "AAPK6db2164fe0ea4d038a202dc721d8a6d79ww1DsTwGfPBwSwsUPV3ij7fMi7sKbHcBZgvoh863r-BruDuQL6oL0lYP8en3PKG";

        const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

        const geoCodeParamsPlace = {
            address: {
                SingleLine: place
            }
        }

        return locator.addressToLocations(locatorUrl, geoCodeParamsPlace)
        .then((response) => {
            return response[0].location;
        })
    })

}

async function getDistance(dep_place, arival_place) {

    let depLocation = await getLocation(dep_place);
    let arivalLocation = await getLocation(arival_place);
    return loadModules(["esri/config", "esri/rest/route", "esri/Graphic", "esri/rest/support/FeatureSet","esri/rest/support/RouteParameters"]).then(([esriConfig, route, Graphic, FeatureSet, RouteParemeters]) => {
        esriConfig.apiKey = "AAPK6db2164fe0ea4d038a202dc721d8a6d79ww1DsTwGfPBwSwsUPV3ij7fMi7sKbHcBZgvoh863r-BruDuQL6oL0lYP8en3PKG";

        const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

        const fillSymbol = {
            type: "simple-marker",
            color: [0, 0, 0],
            size: "8px"
        }

        const depGraphic = new Graphic({
            geometry: depLocation,
            symbol: fillSymbol
        })

        const arivalGraphic = new Graphic({
            geometry: arivalLocation,
            symbol: fillSymbol
        })

        const routeParams = new RouteParemeters({
            stops: new FeatureSet({
                features: [depGraphic, arivalGraphic]

            }),
            directionsLengthUnits: "kilometers",
            returnDirections: true
        })

        return route.solve(routeUrl, routeParams)
            .then(function(data) {
                return data.routeResults[0].directions.totalLength;
            })
    })

}


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
    
    let depPlaceIntPlaceDistance = await getDistance(state.dep_place, myLocation);
    let intPlaceArivalPlaceDistance = await getDistance(myLocation, state.arival_place);

    if (state.myself === "Client") {
      retBody = await postRequest({
        trans: state.transporter,
        client: state.client,
        dep_place: state.dep_place,
        int_place: myLocation,
        arival_place: state.arival_place,
        price: depPlaceIntPlaceDistance * state.empty_price + intPlaceArivalPlaceDistance * state.full_price,
        pay_deadline: state.pay_deadline.split("T")[0],
        t_id: state.id,
        dep_date: state.dep_date.split("T")[0],
        arival_date: state.arival_date.split("T")[0],
        obs: state.obs
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
        c_id: state.id,
        dep_date: state.dep_date.split("T")[0],
        arival_date: state.arival_date.split("T")[0],
        obs: state.obs
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
