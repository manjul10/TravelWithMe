import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

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
        if(!map || !start || !end) return;

        const routingControl = L.Routing.control({
            waypoints:[
                L.latLng(start[0], start[1]),
                L.latLng(end[0], end[1])
            ],
            lineOptions:{
                styles:[{ color: "#7c3aed", weight: 6 }]
            },
            addWaypoints:false,
            routeWhileDragging:false,
            draggableWaypoints:false,
            fitSelectedRoutes:true,
            show: true,
            // Explicitly setting the OSRM demo URL to minimize warnings/errors
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1'
            })
        }).addTo(map);

        return () => {
            // Safety check to prevent "Cannot read properties of null (reading 'removeLayer')"
            if (map && routingControl) {
                try {
                    map.removeControl(routingControl);
                } catch (e) {
                    console.warn("Routing control cleanup failed safely:", e);
                }
            }
        };
    }, [map, start, end]);

    return null;
}

export default Routing;