import { loadModules } from "esri-loader";
import { useEffect, useState } from "react";
import FreeTruckHelper from "./FreeTruckHelper.js";

const FreeTruck = (props) => {

    const [point, setPoint] = useState(0);

    useEffect(() => {

        loadModules(["esri/config", "esri/rest/locator"]).then(([esriConfig, locator]) => {
            esriConfig.apiKey = "AAPK6db2164fe0ea4d038a202dc721d8a6d79ww1DsTwGfPBwSwsUPV3ij7fMi7sKbHcBZgvoh863r-BruDuQL6oL0lYP8en3PKG";

            const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

            const geoCodeParams = {
                address: {
                    SingleLine: props.dep_place
                }
            }
    
           
            locator.addressToLocations(locatorUrl, geoCodeParams)
            .then((response) => {
                setPoint(response[0].location);
            })

        }).catch((err) => console.log(err));

        return function cleanup() {
        };
    }, []);

    return (
        <div>
            {point && <FreeTruckHelper point={point} parentProps={props}/>}
        </div>
    );
}

export default FreeTruck;