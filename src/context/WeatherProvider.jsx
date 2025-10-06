import { useEffect, useState } from "react";
import { WeatherContext } from "./weatherContext";

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
  const [todayDate, setTodayDate] = useState('')
  const [searching, setSearching] = useState(true)
  const [current, setCurrent] = useState(false)
  const [hourly, setHourly] = useState(false)
  const [daily, setDaily] = useState(false)
  const [showCompare, setShowCompare] = useState(false)
  const [reload, setReload] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [daysList, setDaysList] = useState([])
  const [selectedDay, setSelectedDay] = useState()
  const [isDay, setIsDay] = useState()
  const [allSet, setAllSet] = useState(false)
  const [ day, setDay] = useState()
  const [ index, setIndex] = useState(0)
  const [hour, setHour] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  
  

  const dayArray = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthArray = ['Jan','Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']


  useEffect(() => {
    if (current && hourly && daily && allSet) {
      setIsLoading(false)
    } else setIsLoading(true)

  }, [current, daily, hourly, allSet])

  // useEffect for automatic location and wetaher fetching

    useEffect(() => {
      if (!navigator.geolocation) {
        setError(true)
        return;
      }

      const success = async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        setGeoCode({ lat, lon });

        try {
          // Weather API with user's lat/lon
          const nameRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );
          const placeData = await nameRes?.json();
          
          setLocation({
            town: placeData.city,
            country: placeData.countryName
          })
          setPlace(placeData.city)

        } catch (err) {
          setErrorMessage('Location not detected')
          console.log(err)
        }
      };

      const failure = (err) => {
        if (err.code === 1) {
          setSearching(false)
          setErrorMessage("Location not detected. Showing London by default.");
          setGeoCode({ lat: 51.5072, lon: -0.1276 });
          setPlace("London");
          setLocation({ town: "London", country: "United Kingdom" });
        }
      };


      navigator.geolocation.getCurrentPosition(success, failure);
    }, [reload]);

  return (
    <WeatherContext.Provider value={{ lat:geoCode.lat, lon:geoCode.lon, town: location.town, country: location.country, setLocation, error, setError, reload, setReload, dayArray, monthArray, setTodayDate, todayDate, place, setPlace, setGeoCode, setMetric, metric, searching, setSearching, isLoading, setIsLoading, setCurrent, setHourly, setDaily, showCompare, setShowCompare, showMore, setShowMore,   daysList, setDaysList, selectedDay, setSelectedDay, isDay, setIsDay, allSet, setAllSet,  day, setDay, index, setIndex, hour, setHour, errorMessage, setErrorMessage }}>
      {children}
    </WeatherContext.Provider>
  );
}

  
