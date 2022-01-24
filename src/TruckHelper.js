import { loadModules } from "esri-loader";
import { useEffect, useState } from "react";
import {format} from 'react-string-format'
import TruckMovement from './TruckMovement'

const TruckHelper = (props) => {

    const [depIntPath, setDepIntPath] = useState(0);
    const [intArivalPath, setIntArivalPath] = useState(0);
    const [depIntRouteGraphic, setDepIntRouteGraphic] = useState(0);
    const [intArivalRouteGraphic, setIntArivalRouteGraphic] = useState(0);

    useEffect(() => {

        loadModules(["esri/config", "esri/Graphic", "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet"]).then(([esriConfig, Graphic, route, RouteParameters, FeatureSet]) => {
            esriConfig.apiKey = "AAPK6db2164fe0ea4d038a202dc721d8a6d79ww1DsTwGfPBwSwsUPV3ij7fMi7sKbHcBZgvoh863r-BruDuQL6oL0lYP8en3PKG";

             const fillSymbol = {
                type: "simple-marker", // autocasts as new SimpleFillSymbol()
                color: [124, 252, 0],
                size: "8px"
            };
            const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

            const depGraphic = new Graphic({
                geometry: props.depPoint,
                symbol: fillSymbol
            });

            const intGraphic = new Graphic({
                geometry: props.intPoint,
                symbol: fillSymbol,
            });

            const arivalGraphic = new Graphic({
                geometry: props.arivalPoint,
                symbol: fillSymbol
            });

            const routeParamsDepInt = new RouteParameters({
                stops: new FeatureSet({
                    features: [depGraphic, intGraphic],
                }),
                directionsLengthUnits: "kilometers",
                returnDirections: true
            });

            const routeParamsIntArival = new RouteParameters({
                stops: new FeatureSet({
                    features: [intGraphic, arivalGraphic],
                }),
                directionsLengthUnits: "kilometers",
                returnDirections: true
            });

            route.solve(routeUrl, routeParamsDepInt)
                .then(function(data) {
                    data.routeResults.forEach(function(result){
                        result.route.symbol = {
                            type: "simple-line",
                            color: [5, 150, 255],
                            width: 3
                        };
                        props.parentProps.view.graphics.add(result.route);
                        setDepIntRouteGraphic(result.route);
                        setDepIntPath(result.route.geometry.paths[0]);
                    })
                });
            
            route.solve(routeUrl, routeParamsIntArival)
                .then(function(data) {
                    data.routeResults.forEach(function(result){
                        result.route.symbol = {
                            type: "simple-line",
                            color: [5, 150, 255],
                            width: 3
                        };
                        props.parentProps.view.graphics.add(result.route);
                        setIntArivalRouteGraphic(result.route);
                        setIntArivalPath(result.route.geometry.paths[0]);
                    })
                });

            // Add the geometry and symbol to a new graphic
        }).catch((err) => console.log(err));

        return function cleanup() {
        };
    }, []);

    return (
        <div>
            { depIntPath && intArivalPath && depIntRouteGraphic && intArivalRouteGraphic && <TruckMovement path={depIntPath.concat(intArivalPath)} view={props.parentProps.view} depIntRouteGraphic={depIntRouteGraphic} intArivalRouteGraphic={intArivalRouteGraphic} c_id={props.parentProps.c_id} t_id={props.parentProps.id} dep_place={props.parentProps.dep_place} arival_place={props.parentProps.arival_place} dep_date={props.parentProps.dep_date} arival_date={props.parentProps.arival_date}/>}
        </div>
    );
}

export default TruckHelper;