import { loadModules } from "esri-loader";
import { useEffect, useState } from "react";

const TruckMovement = (props) => {
    const [currentTruckPoint, setCurrentTruckPoint] = useState(null);
    const [lastTruckPointGraphic, setLastTruckPointGraphic] = useState(null);
    const [truckPointIndex, setTruckPointIndex] = useState(0);
    const [timer, setTimer] = useState(new Date());

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

                const truckPoint = {
                    type: "point",
                    longitude: currentTruckPoint[0],
                    latitude:  currentTruckPoint[1]
                }

                const truckPointGraphic = new Graphic({
                    geometry: truckPoint,
                    symbol: fillSymbol
                });

                props.view.graphics.add(truckPointGraphic);
                setLastTruckPointGraphic(truckPointGraphic);
            }

            setCurrentTruckPoint(props.path[truckPointIndex]);
            if(truckPointIndex + 25 > props.path.length){
                setTruckPointIndex(props.path.length - 1);
            }
            else{
                setTruckPointIndex(truckPointIndex + 25);
            }

        })
    }, [timer])

    useEffect(() => {
        const interval = setInterval(() => {
           console.log('This will run every second!');
           setTimer(new Date());
        }, 1000);
     
        // This is important, you must clear your interval when component unmounts
        return () => clearInterval(interval);
     
     }, [])

    return null;
}

export default TruckMovement