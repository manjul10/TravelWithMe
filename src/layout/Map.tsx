import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchCities } from "../redux/citiesSlice";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import L from "leaflet";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import User from "../component/User";
import Routing from "../component/Routing";

let DefaultIcon = L.icon({
  iconUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cities, isLoading, currentCity } = useAppSelector((state) => state.cities);

  const [mapPosition, setMapPosition] = useState<[number, number]>([
    28.3949, 84.124,
  ]);

  const {
    isLoading: locationLoading,
    position: locationPosition,
    getPosition,
  } = useGeoLocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([Number(mapLat), Number(mapLng)]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (locationPosition) {
      setMapPosition([locationPosition.lat, locationPosition.lng]);
    navigate(`form?lat=${locationPosition.lat}&lng=${locationPosition.lng}`);
    }
  }, [locationPosition,navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold mb-4">Loading cities...</h2>
        <p className="text-gray-400">
          Please wait while we fetch the city data.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <User/>
      {!locationPosition && (
        <button
          onClick={getPosition}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-1000
      bg-[#ffb545] text-black font-bold py-2 px-4 rounded shadow-lg uppercase text-sm"
        >
          {locationLoading ? "Loading..." : "Use your position"}
        </button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={7}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ChangeCenter position={mapPosition} />
        <ClickOnMap />
{locationPosition && currentCity &&(
<Routing start={[locationPosition.lat, locationPosition.lng]} end={[currentCity.position.lat, currentCity.position.lng]} />
)}


        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <div className="flex flex-col gap-2">
                <span className="font-bold">
                  {city.emoji}
                  <span></span>
                  {city.cityName}
                </span>

                <a
                  href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${
                    city.position.lat
                  },${city.position.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline text-xs"
                >
                  View Street View &rarr;
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${city.position.lat},${city.position.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 underline text-xs"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
        {locationPosition && (
          <Marker position={[locationPosition.lat, locationPosition.lng]}>
            <Popup>You are here!</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
};

const ClickOnMap = () => {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
};
export default Map;
