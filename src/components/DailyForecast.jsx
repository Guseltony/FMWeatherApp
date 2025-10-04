import React, { useEffect, useState } from 'react'
import { useWeather } from '../context/weatherContext'
import { getDailyData } from '../api/weather'
import { getWeatherIcons } from '../assets/weatherIcons'

export const DailyForecast = () => {

  const { lat, lon, metric, setError, isLoading, setDaily, setDaysList, isDay } = useWeather()
  const [data, setData] = useState([])


    useEffect(() => {
      if (!lon || !lat || !data)  return
      // if (!lat, !lon) return
      
      const fetchWeatherData = async () => {
        try {
          const weatherData = await getDailyData(lat, lon, metric)
          if (weatherData) {
            setData(weatherData?.dailyForecastData); setDaily(true)
            setDaysList(weatherData?.daysList)
          }
        } catch (error) {
          setError(true)
          console.log(error)
        }
      }
  
      fetchWeatherData()
    }, [lat, lon, metric])

  if (isLoading) return (
  <div>
        {
              <div className='flex flex-col gap-20 items-start'>
                <p className='text-preset-5a'>Daily forecast</p>

                <div className='grid grid-cols-3 md:grid-cols-7 gap-16 w-[100%]'>
                  <div className='flex flex-col items-center justify-center rounded-12 gap-16 px-10 py-16 bg-neutral-800 border-neutral-600 flex-1 h-[165px]' >
                  </div>
                  <div className='flex flex-col items-center justify-center rounded-12 gap-16 px-10 py-16 bg-neutral-800 border-neutral-600 flex-1 h-[165px]' >
                  </div>
                  <div className='flex flex-col items-center justify-center rounded-12 gap-16 px-10 py-16 bg-neutral-800 border-neutral-600 flex-1 h-[165px]' >
                  </div>
                  <div className='flex flex-col items-center justify-center rounded-12 gap-16 px-10 py-16 bg-neutral-800 border-neutral-600 flex-1 h-[165px]' >
                  </div>
                  <div className='flex flex-col items-center justify-center rounded-12 gap-16 px-10 py-16 bg-neutral-800 border-neutral-600 flex-1 h-[165px]' >
                  </div>
                  <div className='flex flex-col items-center justify-center rounded-12 gap-16 px-10 py-16 bg-neutral-800 border-neutral-600 flex-1 h-[165px]' >
                  </div>
                  <div className='flex flex-col items-center justify-center rounded-12 gap-16 px-10 py-16 bg-neutral-800 border-neutral-600 flex-1 h-[165px]' >
                  </div>

                </div>
          </div>
            }
      </div>
    )


  
  return (
    <div>
      {
        lat && lon && data &&
          <div className='flex flex-col gap-20 items-start'>
                <p className='text-preset-5a'>Daily forecast</p>

                <div className='grid grid-cols-3 md:grid-cols-7 gap-16 w-[100%]'>

                  {
                    data.map((d, index) => 
                    <div className={`flex flex-col items-center justify-center rounded-12 gap-16 px-10 py-16 ${isDay ? 'bg-neutral-0 text-black' : 'bg-neutral-800 text-neutral-0'} border-neutral-600 flex-1`} key={index}>
                    <p className='text-preset-6'>{d.day}</p>
                    <img src={getWeatherIcons(d.code)} alt="" className={`${isDay ? 'filter invert' : ''} w-[60px] h-[60px]`} />
                    <div className='flex items-center justify-between w-full'>
                      <p className={`text-preset-7 ${isDay ? '' : 'text-neutral-0'}`}>{Math.round( d.max)}°</p>
                      <p className={`text-preset-7 ${isDay ? '' : 'text-neutral-0'}`}>{Math.round( d.min)}°</p>
                    </div>
                  </div>
                    )
                  }
                  

                </div>
          </div>
      }
    </div>
  )
}
