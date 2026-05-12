import { useState } from "react";

const useGeoLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const [error, setError] = useState<string | null>(null);

  const getPosition = () => {
    if (!navigator.geolocation) {
      return setError("Geolocation is not supported by your browser");
    }
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setIsLoading(false);
        },
        (err) => {
          setError(err.message);
          setIsLoading(false);
        },
      );
    
  };
  return { position, error, isLoading, getPosition };
};
export default useGeoLocation;
