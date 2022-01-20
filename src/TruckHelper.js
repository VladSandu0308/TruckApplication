import { loadModules } from "esri-loader";
import { useEffect, useState } from "react";

const TruckHelper = (props) => {

    useEffect(() => {

        loadModules(["esri/config", "esri/Graphic", "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet", "esri/rest/locator"]).then(([esriConfig, Graphic, route, RouteParameters, FeatureSet, locator]) => {
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

            const arivalGraphic = new Graphic({
                geometry: props.arivalPoint,
                symbol: fillSymbol
            });

            const routeParams = new RouteParameters({
                stops: new FeatureSet({
                    features: [depGraphic, arivalGraphic],
                }),
                directionsLengthUnits: "kilometers",
                returnDirections: true
            });

            props.parentProps.view.graphics.add(depGraphic);

            route.solve(routeUrl, routeParams)
                .then(function(data) {
                    data.routeResults.forEach(function(result){
                        result.route.symbol = {
                            type: "simple-line",
                            color: [5, 150, 255],
                            width: 3
                        };
                        props.parentProps.view.graphics.add(result.route);
                    })
                    console.log(data.routeResults[0].directions.totalLength);
                });

            // Add the geometry and symbol to a new graphic
        }).catch((err) => console.log(err));

        return function cleanup() {
        };
    }, []);

    return null;
}

export default TruckHelper;