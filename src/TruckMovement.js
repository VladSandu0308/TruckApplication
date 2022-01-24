import { loadModules } from "esri-loader";
import { useEffect, useState } from "react";

const TruckMovement = (props) => {
    const [currentTruckPoint, setCurrentTruckPoint] = useState(null);
    const [lastTruckPointGraphic, setLastTruckPointGraphic] = useState(null);
    const [truckPointIndex, setTruckPointIndex] = useState(0);
    const [timer, setTimer] = useState(new Date());
    const [finished, setFinished] = useState(0);

    useEffect(() => {
        loadModules(["esri/Graphic"]).then(([Graphic]) => {
            if(currentTruckPoint != null){


                if(lastTruckPointGraphic != null){
                    props.view.graphics.remove(lastTruckPointGraphic);
                }
                const fillSymbol = {
                    type: "simple-marker",
                    color: [250, 0, 0],
                    size: "8px"
                };

                const popupTemplate = {
                    title: "{Name}",
                    content: "{Description}"
                 }
                 const attributes = {
                    Name: "Camion " + String(props.t_id),
                    Description:   "De la: " + String(props.dep_place) + "\n" + "La: " + String(props.arival_place) + "\n" +
                     "Data plecare: " + String(props.dep_date) + "\n" + "Data sosire: " + String(props.arival_date)
    
                 }

                const truckPoint = {
                    type: "point",
                    longitude: currentTruckPoint[0],
                    latitude:  currentTruckPoint[1]
                }

                const truckPointGraphic = new Graphic({
                    geometry: truckPoint,
                    symbol: fillSymbol,
                    attributes: attributes,
                    popupTemplate: popupTemplate
                });

                props.view.graphics.add(truckPointGraphic);
                setLastTruckPointGraphic(truckPointGraphic);
            }

            setCurrentTruckPoint(props.path[truckPointIndex]);
            if(truckPointIndex + 100 > props.path.length){
                setTruckPointIndex(props.path.length - 1);
                props.view.graphics.remove(props.depIntRouteGraphic);
                props.view.graphics.remove(props.intArivalRouteGraphic);
                props.view.graphics.remove(lastTruckPointGraphic);
                fetch('http://localhost:8080/finishContract', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: props.c_id})
                })
                setFinished(1);
            }
            else{
                setTruckPointIndex(truckPointIndex + 100);
            }

        })
    }, [timer])

    useEffect(() => {
        const interval = setInterval(() => {
           console.log('This will run every second!');
           if(!finished){
            setTimer(new Date());
           }
        }, 1000);
     
        return () => clearInterval(interval);
     
     }, [])

    return null;
}

export default TruckMovement