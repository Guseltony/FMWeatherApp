import React, { useEffect, useState } from 'react'
import { WeatherProvider } from '../context/WeatherProvider'
import { fetchWeatherForSelectedDay, getCurrentWeather } from '../api/weather'
import { useFavorites, useWeather } from '../context/weatherContext'
import { CurrentCard } from './CurrentCard'
import { getWeatherIcons } from '../assets/weatherIcons'
import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";

export const CurrentWeather = () => {

  const { lat, lon, metric, setTodayDate, place, isLoading, setError, setCurrent, todayDate, setSearching, dayArray, monthArray, town, country, setShowMore, showMore, selectedDay } = useWeather()

  const {favorites, removeFromFavorites} = useFavorites()

  const {addToFavorites} = useFavorites()

  const [data, setData] = useState({})

  const [unit, setUnit] = useState()

  console.log(showMore)



  useEffect(() => {

    setShowMore(false)

    if (!lon || !lat || !data)  return
    
    const fetchWeatherData = async () => {
      if (metric) {
        try {
          const weatherData = await getCurrentWeather(lat, lon)

          const todayData = await weatherData?.metricCurrentData

          const selectedDayWeather = await fetchWeatherForSelectedDay(lat, lon, selectedDay)

          
          
          const timeZone = await weatherData?.metricCurrentData?.time
          
          await setTodayDate(new Date(timeZone)) 

          const checkTime = todayDate?.toISOString().split('T')[0]

          const dataToShow = selectedDay && selectedDay !== checkTime ? selectedDayWeather : todayData
          
          if (weatherData && town && country) {
            const newDate = selectedDay ? new Date(selectedDay) : new Date(timeZone);

            // build fresh fullDate + fullLocation right here
            const fullDateString = `${dayArray[newDate.getDay()]}, ${monthArray[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
            const fullLocationString = `${town}, ${country}`;

            setTodayDate(newDate); // keep context updated too

            setData({
              ...dataToShow,
              date: fullDateString,
              location: fullLocationString
            });
            setUnit(weatherData.metricUnit);
            setCurrent(true);
            setSearching(false);
          }

        } catch (error) {
          setError(true)
          console.log(error)
        }
      } else {
        try {
          const weatherData = await getCurrentWeather(lat, lon)
          const timeZone = await weatherData?.imperialCurrentData?.time
          await setTodayDate(new Date(timeZone)) 

          if (weatherData) {
            const newDate = new Date(timeZone);

            // build fresh fullDate + fullLocation right here
            const fullDateString = `${dayArray[newDate.getDay()]}, ${monthArray[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
            const fullLocationString = `${town}, ${country}`;

            setTodayDate(newDate); // keep context updated too

            setData({
              ...weatherData?.imperialCurrentData,
              date: fullDateString,
              location: fullLocationString
            });

            setUnit(weatherData.imperialUnit);
            setCurrent(true);
            setSearching(false);
          }
        } catch (error) {
          setError(true)
          console.log(error)
        }
      }
    }

    fetchWeatherData()
  }, [lat, lon, metric, country, selectedDay])

  console.log('data:',data)
  console.log('unit:',unit)
  console.log(isLoading)
  console.log('today Date:', todayDate)

  // if (!lon || !lat || !data) return setIsLoading(true)




  if (isLoading) return (
<div>
      {
              <div className='flex items-center flex-col justify-center gap-32 w-[100%]'>
                <div className='px-24 py-0 md:py-80 rounded-20 bg-neutral-800  w-[100%] bg-no-repeat bg-cover h-[286px] flex items-center justify-center gap-14 flex-col'>
                    <div className="spinner flex space-x-10 items-center justify-center">
                      <div className='w-[12px] h-[12px] bg-neutral-0 rounded-full circle circle-1'></div>
                      <div className='w-[12px] h-[12px] bg-neutral-0 rounded-full circle circle-2'></div>
                      <div className='w-[12px] h-[12px] bg-neutral-0 rounded-full circle circle-3'></div>
                    </div>
                    <p className='text-preset-6'>loading...</p>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24 w-[100%]'>
                  <CurrentCard title='Feels like' dataDetails={'-'}/>
                  <CurrentCard title='Humidity' dataDetails={'-'}/>
                  <CurrentCard title='Wind' dataDetails={'-'}/>
                  <CurrentCard title='Precipitation' dataDetails={'-'}/>
                </div>  
              </div>
          }
    </div>
  )


  
  return (
    <div>
      {
            lat && lon && data && 
              <div className='flex items-center flex-col justify-center gap-32 w-[100%]'>
                <div className='px-24 py-0 md:py-80 rounded-20 bg-[url("/src/assets/images/bg-today-small.svg")] md:bg-[url("/src/assets/images/bg-today-large.svg")] w-[100%] bg-cover h-[286px] flex items-center justify-center md:justify-between flex-col md:flex-row gap-16 md:gap-0 relative'>
                {data?.location && data?.date && (
                  <div className="flex flex-col gap-12 items-center md:items-start justify-center">
                    <h1 className="text-preset-4 text-center md:text-left line-clamp-2 md:w-[500px]">
                      {data.location}
                    </h1>
                    <p className="text-preset-6">{data.date}</p>
                  </div>
                )}
                      
                  <div className='flex items-center justify-between gap-20'>
                    <img src={getWeatherIcons(data?.weather_code)} alt="" className='w-[120px] h-[120px]'/>
                    <h1 className='text-preset-1'>{Math.round(data?.apparent_temperature)}°</h1>
                  </div>

              {
                favorites.map((fav, index) => fav === place ?
                  <div className='absolute top-6 right-8 cursor-pointer' key={index} onClick={() => removeFromFavorites(fav)}>
                    <FaHeartCircleMinus size={35} className='text-red-200'/>
                  </div> :                                                  <div className='absolute top-6 right-8 cursor-pointer' key={index} onClick={() => addToFavorites(place)}>
                    <FaHeartCirclePlus size={35} className='text-red-200'/>
                  </div> )
              }

              {
                favorites.length === 0 &&
                <div className='absolute top-6 right-8 cursor-pointer' onClick={() => addToFavorites(place)}>
                    <FaHeartCirclePlus size={35} className='text-red-200'/>
                  </div>
              }

                </div>

            
            <div className='w-full'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24 w-[100%] mb-10'>
                  <CurrentCard title='Feels like' dataDetails={`${Math.round(data?.temperature_2m)}${unit?.temperature_2m}`} />
                  <CurrentCard title='Humidity' dataDetails={`${data?.relative_humidity_2m}${unit?.relative_humidity_2m}`} />
                  <CurrentCard title='Wind' dataDetails={`${Math.round(data?.wind_speed_10m)} ${unit?.wind_speed_10m}`} />
                  <CurrentCard title='Precipitation' dataDetails={`${data?.precipitation} ${unit?.precipitation}`} />
              </div>
            
              <div className='w-full'>
                <div className='text-preset-7 flex items-center gap-6 select-none cursor-pointer' onClick={() => setShowMore(prev => !prev)}>
                <p>More Weather Details</p>
                <img src="/src/assets/images/icon-dropdown.svg" alt="" />
              </div>
              {
                showMore && 
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24 w-[100%] mt-10'>
                    <CurrentCard title='Pressure' dataDetails={`${Math.round(data?.surface_pressure)}${unit?.surface_pressure}`} />
                    <CurrentCard title='Visibility' dataDetails={`${data?.visibility.toLocaleString()}`} />
                    <CurrentCard title='UV Index' dataDetails={`${data?.uv_index} ${unit?.uv_index}`} />
                    <CurrentCard title='Precipitation' dataDetails={`${data?.precipitation} ${unit?.precipitation}`} />
                  </div>  
              }
            </div>
            </div>

            
            </div>
          }
    </div>
  )
}
