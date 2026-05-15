import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchCities, setStartCity, setEndCity, clearRoute } from "../redux/citiesSlice";
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
import Routing from "../component/Routing";

let DefaultIcon = L.icon({
  iconUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ onMapClick }: { onMapClick?: () => void }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cities, isLoading, startCity, endCity } = useAppSelector((state) => state.cities);

  const [mapPosition, setMapPosition] = useState<[number, number]>([
    28.3949, 84.124,
  ]);

  const {
    isLoading: locationLoading,
    position: locationPosition,
    getPosition,
  } = useGeoLocation();

  const [mapLat, mapLng] = useUrlPosition();
  const [showSearch, setShowSearch] = useState<'start' | 'end' | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([Number(mapLat), Number(mapLng)]);
    }
  }, [mapLat, mapLng]);

  const filteredCities = cities.filter(city => 
    city.cityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startCoords = startCity 
    ? [startCity.position.lat, startCity.position.lng] as [number, number]
    : locationPosition 
      ? [locationPosition.lat, locationPosition.lng] as [number, number]
      : null;

  const endCoords = endCity 
    ? [endCity.position.lat, endCity.position.lng] as [number, number]
    : null;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
        <h2 className="text-xl font-bold text-gray-800">Loading your world...</h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative z-0 flex flex-col min-h-0">
      {/* Mobile Sidebar Trigger */}
      <div className="absolute top-4 left-4 z-[1000] lg:hidden">
         <button 
           onClick={onMapClick}
           className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100 text-purple-600 hover:bg-purple-50 transition-all"
         >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
           </svg>
         </button>
      </div>

      {/* Floating Routing Card */}
      <div className="absolute top-4 right-4 z-[1000] w-72 sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all animate-in slide-in-from-right-4 duration-300">
        <div className="bg-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span className="font-bold text-xs uppercase tracking-widest">Navigation</span>
            </div>
            <button 
              onClick={() => dispatch(clearRoute())}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
        
        <div className="p-4 space-y-4">
            <div className="flex flex-col gap-3 relative">
              <div className="absolute left-[11px] top-4 bottom-4 w-0.5 border-l border-dashed border-purple-200"></div>
              
              {/* Start Point Selection */}
              <div className="flex items-center gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center border-2 border-white z-10 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                </div>
                <div className="flex-1">
                  <button 
                    onClick={() => setShowSearch(showSearch === 'start' ? null : 'start')}
                    className="w-full text-left bg-gray-50 px-3 py-2 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors truncate"
                  >
                    {startCity ? startCity.cityName : (locationPosition ? "My Location" : "Select Start Point")}
                  </button>
                  {showSearch === 'start' && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-[1010] max-h-40 overflow-y-auto p-2">
                       <input 
                         autoFocus
                         placeholder="Filter cities..." 
                         className="w-full text-[10px] p-2 border-b border-gray-50 outline-none mb-1"
                         onChange={(e) => setSearchQuery(e.target.value)}
                       />
                       {locationPosition && (
                         <button 
                           onClick={() => {
                             dispatch(setStartCity(null));
                             setShowSearch(null);
                             setSearchQuery("");
                           }}
                           className="w-full text-left p-2 text-[10px] text-purple-600 font-bold hover:bg-purple-50 rounded-lg transition-colors border-b border-gray-50 mb-1"
                         >
                           ✨ Use My Current Location
                         </button>
                       )}
                       {filteredCities.map(city => (
                         <button 
                           key={city.id}
                           onClick={() => {
                             dispatch(setStartCity(city));
                             setShowSearch(null);
                             setSearchQuery("");
                           }}
                           className="w-full text-left p-2 text-[10px] hover:bg-purple-50 rounded-lg transition-colors"
                         >
                           {city.cityName}
                         </button>
                       ))}
                    </div>
                  )}
                </div>
              </div>

              {/* End Point Selection */}
              <div className="flex items-center gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center border-2 border-white shadow-lg shadow-purple-200 z-10">
                  <span className="text-[10px] text-white">📍</span>
                </div>
                <div className="flex-1">
                  <button 
                    onClick={() => setShowSearch(showSearch === 'end' ? null : 'end')}
                    className="w-full text-left bg-gray-50 px-3 py-2 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors truncate"
                  >
                    {endCity ? endCity.cityName : "Select Destination"}
                  </button>
                  {showSearch === 'end' && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-[1010] max-h-40 overflow-y-auto p-2">
                       <input 
                         autoFocus
                         placeholder="Filter cities..." 
                         className="w-full text-[10px] p-2 border-b border-gray-50 outline-none mb-1"
                         onChange={(e) => setSearchQuery(e.target.value)}
                       />
                       {filteredCities.map(city => (
                         <button 
                           key={city.id}
                           onClick={() => {
                             dispatch(setEndCity(city));
                             setShowSearch(null);
                             setSearchQuery("");
                           }}
                           className="w-full text-left p-2 text-[10px] hover:bg-purple-50 rounded-lg transition-colors"
                         >
                           {city.cityName}
                         </button>
                       ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
        </div>
      </div>

      {!locationPosition && (
        <button
          onClick={getPosition}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000]
      bg-purple-600 text-white font-bold py-3 px-8 rounded-2xl shadow-2xl shadow-purple-200 uppercase text-xs tracking-widest hover:bg-purple-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {locationLoading ? "Searching..." : "Pin My Location"}
        </button>
      )}

      {/* Map Container Wrapper */}
      <div className="flex-1 w-full h-full min-h-0 relative z-0">
        <MapContainer
          center={mapPosition}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <ChangeCenter position={mapPosition} />
          <ClickOnMap onMapClick={onMapClick} />
          {startCoords && endCoords && (
            <Routing 
              start={startCoords} 
              end={endCoords} 
            />
          )}

          {cities.map((city) => (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <div className="flex flex-col gap-2 p-1">
                  <span className="font-black text-gray-800 flex items-center gap-2">
                    {city.emoji} {city.cityName}
                  </span>
                  <div className="flex flex-col gap-1">
                    <button 
                      onClick={() => dispatch(setStartCity(city))}
                      className="text-[10px] bg-purple-50 text-purple-700 py-1 px-2 rounded-md font-bold hover:bg-purple-100"
                    >
                      Set as Start
                    </button>
                    <button 
                      onClick={() => dispatch(setEndCity(city))}
                      className="text-[10px] bg-gray-50 text-gray-700 py-1 px-2 rounded-md font-bold hover:bg-gray-100"
                    >
                      Set as End
                    </button>
                  </div>
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
    </div>
  );
};

const ChangeCenter = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [map, position]);
  return null;
};

const ClickOnMap = ({ onMapClick }: { onMapClick?: () => void }) => {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      if (onMapClick) onMapClick();
      navigate(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
};
export default Map;
