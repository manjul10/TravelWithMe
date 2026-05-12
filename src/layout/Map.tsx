import { useEffect } from "react";
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
const Map = () => {
  const dispatch = useAppDispatch();
  const { cities, isLoading } = useAppSelector((state) => state.cities);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

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
    <div className="w-full h-full flex items-center justify-center">
      <MapContainer
        center={[28.3949, 84.124]}
        zoom={7}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ClickOnMap/>
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
                {/* ADD THE STREET VIEW LINK HERE */}
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

                {/* OR A GENERAL GOOGLE MAPS LINK */}
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
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }) => {
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
