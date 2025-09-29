import { useEffect, useState } from "react";
import { getGeoLoc } from "../api/weather";
import { useFavorites, WeatherContext } from "./weatherContext";

export const WeatherProvider = ({children}) => {

  
  const [geoCode, setGeoCode] = useState({
    lat: null,
    lon: null,
  });

  const [location, setLocation] = useState({
    town: '',
    country: ''
  })

  const [place, setPlace] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [metric, setMetric] = useState(true)
  const [todayDate, setTodayDate] = useState()
  const [searching, setSearching] = useState(true)
  const [current, setCurrent] = useState(false)
  const [hourly, setHourly] = useState(false)
  const [daily, setDaily] = useState(false)
  const [showCompare, setShowCompare] = useState(false)
  const [reload, setReload] = useState(false)
  const [showMore, setShowMore] = useState(false)
    const [daysList, setDaysList] = useState([])
    const [selectedDay, setSelectedDay] = useState()

  const { setShowFavorites } = useFavorites()
  

  const dayArray = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthArray = ['Jan','Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

  const day = dayArray[todayDate?.getDay()]
  const date = todayDate?.getDate()
  const month = monthArray[todayDate?.getMonth()]
  const year = todayDate?.getFullYear()
  const hour = todayDate?.getHours()
  const town = location?.town
  const country = location?.country

  const fullDate = `${day}, ${month} ${date}, ${year}`
  const fullLocation = `${town}, ${country}`


  
  useEffect(() => {
    if (current && hourly && daily) {
      setIsLoading(false)
    } else setIsLoading(true)

  }, [current, daily, hourly])

  console.log("geoCode:", geoCode)

    useEffect(() => {
      if (!navigator.geolocation) {
        // setError("Geolocation not supported");
        setError(true)
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
          const placeData = await nameRes?.json();

          console.log("Weather:", weatherData);
          console.log("Place:", placeData);
          setLocation({
            town: placeData.city,
            country: placeData.countryName
          })
          setPlace(placeData.city)

        } catch (err) {
          setError(true)
          console.log(err)
        }
      };

      const failure = (err) => {
        setError(true)
        console.log("Geolocation error:", err);
      };

      navigator.geolocation.getCurrentPosition(success, failure);
    }, [reload]);


  useEffect(() => {
    if (!place) return
    const getGeoLocation = async () => {
      try {
        const locationDetails = await getGeoLoc(place)
        setGeoCode({ lat: locationDetails.lat, lon: locationDetails.lon })
        setLocation({ town: locationDetails?.geoLoc.name, country: locationDetails?.geoLoc.country })

        localStorage.setItem("place", place)
        // setSearching(false)
        console.log('geoooo:', locationDetails?.geoLoc)
        setShowFavorites(false)

      } catch (error) {
      setError(true)
      console.log(error)
        
    }
  }

    getGeoLocation()
  }, [place])

  return (
    <WeatherContext.Provider value={{ lat:geoCode.lat, lon:geoCode.lon, town: location.town, country: location.country, setLocation, error, setError, reload, setReload, dayArray, monthArray, day, date, month, year, setTodayDate, todayDate, hour, place, setPlace, setGeoCode, setMetric, metric, searching, setSearching, isLoading, setIsLoading, setCurrent, setHourly, setDaily,fullDate, fullLocation, showCompare, setShowCompare, showMore, setShowMore,   daysList, setDaysList, selectedDay, setSelectedDay }}>
      {children}
    </WeatherContext.Provider>
  );
}

  
