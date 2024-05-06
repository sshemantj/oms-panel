import { useState, useEffect } from "react";

interface ICurrLocation {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

const useCurrentLocation = () => {
  const [location, setLocation] = useState<ICurrLocation>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    const successHandler = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setLocation((prevLocation) => ({
        ...prevLocation,
        error: error.message,
      }));
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successHandler,
        errorHandler,
        options
      );
    } else {
      setLocation((prevLocation) => ({
        ...prevLocation,
        error: "Geolocation is not supported by your browser.",
      }));
    }
  }, []);

  return location;
};

export default useCurrentLocation;
