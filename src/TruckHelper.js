import { loadModules } from "esri-loader";
import { useEffect, useState } from "react";
import {format} from 'react-string-format'

const TruckHelper = (props) => {

    useEffect(() => {

        loadModules(["esri/config", "esri/Graphic", "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet"]).then(([esriConfig, Graphic, route, RouteParameters, FeatureSet]) => {
            esriConfig.apiKey = "AAPK6db2164fe0ea4d038a202dc721d8a6d79ww1DsTwGfPBwSwsUPV3ij7fMi7sKbHcBZgvoh863r-BruDuQL6oL0lYP8en3PKG";

             const fillSymbol = {
                type: "simple-marker", // autocasts as new SimpleFillSymbol()
                color: [124, 252, 0],
                size: "8px"
            };
            const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

            const popupTemplate = {
                title: "{Name}",
                content: "{Description}"
             }
             const attributes = {
                Name: "Camion " + String(props.parentProps.id),
                Description:   "De la: " + String(props.parentProps.dep_place) + "\n" + "La: " + String(props.parentProps.arival_place) + "\n" +
                 "Data plecare: " + String(props.parentProps.dep_date) + "\n" + "Data sosire: " + String(props.parentProps.arival_date)

             }
            const depGraphic = new Graphic({
                geometry: props.depPoint,
                symbol: fillSymbol,
                attributes: attributes,
                popupTemplate: popupTemplate
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

            props.parentProps.view.graphics.add(depGraphic);

            route.solve(routeUrl, routeParamsDepInt)
                .then(function(data) {
                    data.routeResults.forEach(function(result){
                        result.route.symbol = {
                            type: "simple-line",
                            color: [5, 150, 255],
                            width: 3
                        };
                        props.parentProps.view.graphics.add(result.route);
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
                    })
                });

            // Add the geometry and symbol to a new graphic
        }).catch((err) => console.log(err));

        return function cleanup() {
        };
    }, []);

    return null;
}

export default TruckHelper;