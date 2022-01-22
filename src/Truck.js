import { loadModules } from "esri-loader";
import { useEffect, useState } from "react";
import TruckHelper from "./TruckHelper.js";

const Point = (props) => {

    const [depPoint, setDepPoint] = useState(0);
    const [intPoint, setIntPoint] = useState(0);
    const [arivalPoint, setArivalPoint] = useState(0);

    useEffect(() => {

        loadModules(["esri/config", "esri/rest/locator"]).then(([esriConfig, locator]) => {
            esriConfig.apiKey = "AAPK6db2164fe0ea4d038a202dc721d8a6d79ww1DsTwGfPBwSwsUPV3ij7fMi7sKbHcBZgvoh863r-BruDuQL6oL0lYP8en3PKG";

             const fillSymbol = {
                type: "simple-marker", // autocasts as new SimpleFillSymbol()
                color: [226, 119, 40],
                size: "8px"
            };
            const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
            const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

            const geoCodeParamsDepPlace = {
                address: {
                    SingleLine: props.dep_place
                }
            }

            const geoCodeParamsIntPlace = {
                address: {
                    SingleLine: props.int_place
                }
            }
    
            const geoCodeParamsArivalPlace = {
                address: {
                    SingleLine: props.arival_place
                }
            }
    
           
                locator.addressToLocations(locatorUrl, geoCodeParamsDepPlace)
                .then((response) => {
                    setDepPoint(response[0].location);
                })

                locator.addressToLocations(locatorUrl, geoCodeParamsIntPlace)
                .then((response) => {
                    setIntPoint(response[0].location);
                })
        
                locator.addressToLocations(locatorUrl, geoCodeParamsArivalPlace)
                .then((response) => {
                    setArivalPoint(response[0].location);
                })
        }).catch((err) => console.log(err));

        return function cleanup() {
        };
    }, []);

    return (
        <div>
            {depPoint && intPoint && arivalPoint && <TruckHelper depPoint={depPoint} intPoint={intPoint} arivalPoint={arivalPoint} parentProps={props}/>}
        </div>
    );
}

export default Point;