import { useEffect, useState } from "react";
import { getGeoLoc } from "../api/weather";
import { WeatherContext } from "./weatherContext";
// import { getAutoGeoLoc } from "../hooks/autoGeoLocation";
 

export const WeatherProvider = ({children}) => {

  
  const [geoCode, setGeoCode] = useState({
    lat: null,
    lon: null,
  });

  const [location, setLocation] = useState({
    town: null,
    country: null
  })

  const [place, setPlace] = useState('')

  const [error, setError] = useState()

  const [metric, setMetric] = useState(true)
  
  const [todayDate, setTodayDate] = useState()

  //  const todayDate = new Date()

  const dayArray = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthArray = ['Jan','Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

  const day = dayArray[todayDate?.getDay()]
  const date = todayDate?.getDate()
  const month = monthArray[todayDate?.getMonth()]
  const year = todayDate?.getFullYear()
  const hour = todayDate?.getHours()
  


    useEffect(() => {
      if (!navigator.geolocation) {
        setError("Geolocation not supported");
        return;
      }

      const success = async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        setGeoCode({ lat, lon });

        try {
          // Weather API with user's lat/lon
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
          );
          const weatherData = await weatherRes.json();

          // Reverse geocoding with BigDataCloud (no CORS issue)
          const nameRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );
          const placeData = await nameRes.json();

          console.log("Weather:", weatherData);
          console.log("Place:", placeData);
          setLocation({
            town: placeData.city,
            country: placeData.countryName
          })

        } catch (err) {
          console.error("API error:", err);
        }
      };

      const failure = (err) => {
        console.log("Geolocation error:", err);
      };

      navigator.geolocation.getCurrentPosition(success, failure);
    }, []);

  
  
  

  useEffect(() => {
    if(!place) return 
    const getGeoLocation = async () => {


      const locationDetails = await getGeoLoc(place)
      setGeoCode({ lat: locationDetails.lat, lon: locationDetails.lon })
      setLocation({town: locationDetails?.geoLoc.name, country: locationDetails?.geoLoc.country})
      console.log('geoooo:',locationDetails?.geoLoc)
    }

    getGeoLocation()
  }, [place])

  return (
    <WeatherContext.Provider value={{ lat:geoCode.lat, lon:geoCode.lon, town: location.town, country: location.country, setLocation, error, setError, dayArray, day, date, month, year, setTodayDate, hour, place, setPlace, setGeoCode, setMetric, metric }}>
      {children}
    </WeatherContext.Provider>
  );
}

  
