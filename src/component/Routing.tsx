import { useEffect } from "react";
import { useMap } from "react-leaflet";

declare global{
    namespace L{
        namespace Routing{
            function control(options: any): any;
        }
    }
}


interface RoutingProps{
    start:[number,number];
    end:[number,number];

}


const Routing = ({start,end}:RoutingProps)=>{
    const map = useMap();

    useEffect(() => {
        if(!map || !start ||!end) return;

        const routingControl =L.Routing.control({
            waypoints:[
                L.latLng(start[0], start[1]),
                L.latLng(end[0], end[1])
            ],
            lineOptions:{
                styles:[{color:'blue', weight: 5}]
            },
            addWaypoints:false,
            routeWhileDragging:false,
            draggableWaypoints:false,
           fitSelectRoutes:true,
           show: true,
        }).addTo(map);

        return()=> map.removeControl(routingControl);
    },[map,start,end])

    return null;
}

export default Routing;