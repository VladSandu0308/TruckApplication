import { loadModules } from "esri-loader";
import { useEffect, useState } from "react";
import {format} from 'react-string-format'
import TruckMovement from './TruckMovement'

const FreeTruckHelper = (props) => {

    useEffect(() => {

        loadModules(["esri/config", "esri/Graphic", "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet"]).then(([esriConfig, Graphic, route, RouteParameters, FeatureSet]) => {
            esriConfig.apiKey = "AAPK6db2164fe0ea4d038a202dc721d8a6d79ww1DsTwGfPBwSwsUPV3ij7fMi7sKbHcBZgvoh863r-BruDuQL6oL0lYP8en3PKG";

            const fillSymbol = {
                type: "simple-marker",
                color: [124, 252, 0],
                size: "8px"
            };

            const popupTemplate = {
                title: "{Name}",
                content: "{Description}"
             }
             const attributes = {
                Name: "Camion " + String(props.parentProps.t_id),
                Description:   "De la: " + String(props.parentProps.dep_place) + "\n" + "La: " + String(props.parentProps.arival_place) + "\n" +
                 "Data plecare: " + String(props.parentProps.dep_date) + "\n" + "Data sosire: " + String(props.parentProps.arival_date) + "\n" +
                 "Stare Camion: Liber"
             }

            const graphic = new Graphic({
                geometry: props.point,
                symbol: fillSymbol,
                attributes: attributes,
                popupTemplate: popupTemplate
            });

            props.parentProps.view.graphics.add(graphic);
        }).catch((err) => console.log(err));

        return function cleanup() {
        };
    }, []);

    return null;
}

export default FreeTruckHelper;