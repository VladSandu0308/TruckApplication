import { loadModules } from "esri-loader";
import { useEffect, useState } from "react"




const Point = (props) => {
    const [graphic, setPoint] = useState(null);

    useEffect(() => {
        loadModules(['esri/Graphic', "esri/rest/route","esri/rest/support/RouteParameters","esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"]).then(([Graphic]) => {
            const point = { 
                type: "point",
                longitude: props.x,
                latitude: props.y
             };
             const fillSymbol = {
                type: "simple-marker", // autocasts as new SimpleFillSymbol()
                color: [226, 119, 40],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 1
                }
            };

            const popupTemplate = {
                title: "{Name}",
                content: "{Description}"
             };

             const attributes = {
                Name: "Graphic",
                Description: "I am a polygon"
             };

            // Add the geometry and symbol to a new graphic
            const graphic = new Graphic({
                geometry: point,
                symbol: fillSymbol,
                attributes: attributes,
                popupTemplate: popupTemplate
            });
            setPoint(graphic);
            props.view.graphics.add(graphic);
        }).catch((err) => console.log(err));

        return function cleanup() {
            props.view.graphics.remove(graphic);
        };
    }, []);

    return null;
}

export default Point;