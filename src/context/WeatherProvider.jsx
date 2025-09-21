import { useEffect, useState } from "react";
import { getGeoLoc } from "../api/weather";
import { WeatherContext } from "./weatherContext";
 

export const WeatherProvider = ({children}) => {

  
  const [geoCode, setGeoCode] = useState({
    lat: null,
    lon: null,
  });

  const [location, setLocation] = useState({
    town: null,
    country: null
  })

  const [place, setPlace] = useState('oyo')

   const todayDate = new Date()

  const dayArray = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthArray = ['Jan','Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

  const day = dayArray[todayDate.getDay()]
  const date = todayDate.getDate()
  const month = monthArray[todayDate.getMonth()]
  const year = todayDate.getFullYear()
  const hour =todayDate.getHours()

  useEffect(() => {
    if(!place) return 
    const getGeoLocation = async () => {
      const locationDetails = await getGeoLoc(place)
      setGeoCode({ lat: locationDetails.lat, lon: locationDetails.lon })
      setLocation({town: locationDetails?.geoLoc.name, country: locationDetails?.geoLoc.country})
    }

    getGeoLocation()
  }, [place])

  // if(country) console.log(country)



  const [error, setError] = useState(null);

  return (
    <WeatherContext.Provider value={{ lat:geoCode.lat, lon:geoCode.lon, town: location.town, country: location.country, setLocation, error, setError, dayArray, day, date, month, year, hour, place, setPlace, setGeoCode }}>
      {children}
    </WeatherContext.Provider>
  );
}

  
