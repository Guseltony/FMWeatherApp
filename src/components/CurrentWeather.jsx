/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { WeatherProvider } from '../context/WeatherProvider'
import { fetchWeatherForSelectedDay, getCurrentWeather } from '../api/weather'
import { useFavorites, useWeather } from '../context/weatherContext'
import { CurrentCard } from './CurrentCard'
import { getWeatherIcons } from '../assets/weatherIcons'
import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";
import { LuSunrise } from "react-icons/lu";
import { LuSunset } from "react-icons/lu";

export const CurrentWeather = () => {

  const { lat, lon, metric, setTodayDate, place, isLoading, setError, setCurrent, setSearching, dayArray, monthArray, town, country, selectedDay, searching, setSelectedDay, isDay, setIsDay } = useWeather()

  const {favorites, removeFromFavorites} = useFavorites()

  const {addToFavorites} = useFavorites()

  const [data, setData] = useState({})

  const [unit, setUnit] = useState()


  useEffect(() => {

    const fullLocationString = `${town}, ${country}`;

    if (!lon || !lat || !data)  return
      
      const fetchWeatherData = async () => {
          try {
            const weatherData = await getCurrentWeather(lat, lon, metric)
  
            const todayData = await weatherData?.data
            const sunriseSunset = await weatherData?.sunriseSunset

            const selectedDayWeather = await fetchWeatherForSelectedDay(lat, lon, selectedDay, metric)
  
            if(searching) setSelectedDay('')
            
            
            const timeZone = await todayData?.time
            
            const todayDate = new Date(timeZone)

            
            const currentDate = todayDate.toISOString().split('T')[0]

            
            await setTodayDate(todayDate) 
            
            const sunRiseData = await selectedDay && selectedDay !== currentDate ? sunriseSunset?.sunrise?.filter((s) => s.split('T')[0] === selectedDay) :
                                                              sunriseSunset?.sunrise?.filter((s) => s.split('T')[0] === currentDate)
            const sunSetData = await selectedDay && selectedDay !== currentDate ? sunriseSunset?.sunset?.filter((s) => s.split('T')[0] === selectedDay) :
                                                              sunriseSunset?.sunset?.filter((s) => s.split('T')[0] === currentDate)
  
  
            const dataToShow = selectedDay && selectedDay !== currentDate ? selectedDayWeather : todayData
            
            if (weatherData && town && country) {
              const newDate = selectedDay && selectedDay !== currentDate ? new Date(selectedDay) : new Date(timeZone);
  
              const fullDateString = `${dayArray[newDate.getDay()]}, ${monthArray[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
              setData({
                ...dataToShow,
                date: fullDateString,
                location: fullLocationString,
                sunrise: sunRiseData[0].split('T')[1],
                sunset: sunSetData[0].split('T')[1]
              });
              setUnit(weatherData.unit);
              setCurrent(true);
              setSearching(false);
              setIsDay(todayData?.is_day)
            }
  
          } catch (error) {
            setError(true)
            console.log(error)
          }
      }

  
      fetchWeatherData()
    
  }, [lat, lon, metric, selectedDay])

  if (isLoading || !data.location || !data.date) return (
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

                <div className='grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24 w-[100%] mb-10'>
                  <CurrentCard title='Feels like' dataDetails={'-'}/>
                  <CurrentCard title='Humidity' dataDetails={'-'}/>
                  <CurrentCard title='Wind' dataDetails={'-'}/>
                  <CurrentCard title='Precipitation' dataDetails={'-'}/>
                  <CurrentCard title='Pressure' dataDetails={'-'}/>
                  <CurrentCard title='Visibility' dataDetails={'-'}/>
                  <CurrentCard title='UV Index' dataDetails={'-'}/>
                  <CurrentCard title='Sunrise | Sunset' dataDetails={'-'}/>
                </div>  
              </div>
          }
    </div>
  )


  
  return (
    <div>
      {
            lat && lon && data && data.date && data.location &&
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
                <CurrentCard title='Pressure' dataDetails={`${Math.round(data?.surface_pressure)}${unit?.surface_pressure}`} />
                    <CurrentCard title='Visibility' dataDetails={`${data?.visibility?.toFixed(0)}`} />
                    <CurrentCard title='UV Index' dataDetails={`${data?.uv_index} ${unit?.uv_index}`} />
                    <div className={`${isDay ? 'bg-neutral-0 text-black ' : 'bg-neutral-800 text-neutral-0'} px-20 py-20 border-neutral-600 flex gap-24 flex-col rounded-12 `}>
                      <div className='flex flex-row items-center justify-between'>
                        <LuSunrise size={25} className='text-red-500' />
                        <p className='text-preset-6'>{ data?.sunrise}</p>
                      </div>
                      <div className='flex flex-row items-center justify-between'>
                        <LuSunset  size={25} className='text-red-500'/>
                        <p className='text-preset-6'>{ data?.sunset}</p>
                      </div>
                    </div>
              </div>
            </div>

            
            </div>
          }
    </div>
  )
}
