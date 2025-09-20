import React, { useEffect, useState } from 'react'
import { WeatherProvider } from '../context/WeatherProvider'
import { getCurrentWeather } from '../api/weather'
import { useWeather } from '../context/weatherContext'
import { CurrentCard } from './CurrentCard'

export const CurrentWeather = () => {

  const { day, month, date, year, lat, lon, town, country } = useWeather()

  const [data, setData] = useState()

  useEffect(() => {
    if (!lat, !lon) return
    
    const fetchWeatherData = async () => {
      try {
        const weatherData = await getCurrentWeather(lat, lon)
        if(weatherData) setData(weatherData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchWeatherData()
  }, [lat, lon])


  console.log(data)
  console.log(lat, lon)


  if (!lon || !lat || !data) return (
<div>
      {
              <div className='flex items-center flex-col justify-center gap-32 w-[100%]'>
                <div className='px-24 py-0 md:py-80 rounded-20 bg-neutral-800  w-[100%] bg-no-repeat bg-cover h-[286px] flex items-center justify-center gap-16 md:gap-0'>
                    <div className="spinner">
                      <div className='w-[12px] h-[12px]'></div>
                    </div>
                    <p className='text-preset-6'>loading . . .</p>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24 w-[100%]'>
                  <CurrentCard title='Feels like' dataDetails={'-'}/>
                  <CurrentCard title='Humidity' dataDetails={'-'}/>
                  <CurrentCard title='Wind' dataDetails={'-'}/>
                  <CurrentCard title='Feels like' dataDetails={'-'}/>
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
                <div className='px-24 py-0 md:py-80 rounded-20 bg-[url("/src/assets/images/bg-today-small.svg")] md:bg-[url("/src/assets/images/bg-today-large.svg")] w-[100%] bg-no-repeat bg-cover h-[286px] flex items-center justify-center md:justify-between flex-col md:flex-row gap-16 md:gap-0'>
                        <div className='flex flex-col gap-12 items-center md:items-start justify-center'>
                          <h1 className='text-preset-4'>{town}, {country}</h1>
                          <p className='text-preset-6'>{day}, {month} {date}, { year}</p>
                        </div>
                  
                        <div className='flex items-center justify-between gap-20'>
                          <img src="/src/assets/images/icon-sunny.webp" alt="" className='w-[120px] h-[120px]'/>
                          <h1 className='text-preset-1'>{Math.round(data?.apparent_temperature)}°</h1>
                        </div>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24 w-[100%]'>
                  <CurrentCard title='Feels like' dataDetails={`${Math.round(data?.apparent_temperature)}°`} />
                  <CurrentCard title='Humidity' dataDetails={`${data?.relative_humidity_2m}%`} />
                  <CurrentCard title='Wind' dataDetails={`${Math.round(data?.wind_speed_10m)} km/h`} />
                  <CurrentCard title='Feels like' dataDetails={`${data?.precipitation} mm`} />
                </div>  
              </div>
          }
    </div>
  )
}
