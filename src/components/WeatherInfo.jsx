import React, { useEffect, useState } from 'react'

// import { fetchWeatherApi } from 'openmeteo';


export const WeatherInfo = () => {

  const [currentWeather, setCurrentWeather] =  useState()
  const [geoDetails, setGeoDetails] = useState()
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [dailyTempMax, setDailyTempMax] = useState([])
  const [dailyTempMin, setDailyTempMin] = useState([])
  const [allDailyData, setAllDailyData] = useState([])
  const [dailyTime, setDailyTime] = useState([])
  const [hourlyForecastWeather, setHourlyForecastWeather] = useState([])

  const todayDate = new Date()

  const dayArray = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthArray = ['Jan','Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

  const day = dayArray[todayDate.getDay()]
  const date = todayDate.getDate()
  const month = monthArray[todayDate.getMonth()]
  const year = todayDate.getFullYear()

  // console.log(todayDay)
  // console.log(todayDate)

  useEffect(() => {
    const getGeoLoc = async () => {
        const geoApi = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=Oyo')

      const geoData = await geoApi.json()

      const geoLoc = geoData?.results[0]
      
      setGeoDetails(geoLoc)
      setLat(geoLoc?.latitude)
      setLon(geoLoc?.longitude) 
    }

    getGeoLoc()

  }, [])

  useEffect(() => {

    if (!lat) return 

    const getWeather = async () => {
      


      const res = await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=apparent_temperature,precipitation,wind_speed_10m,relative_humidity_2m`
     );

        const data = await res.json();
        
      const currentData = data?.current
      
      setCurrentWeather(currentData)
      }

      getWeather()
  }, [lat, lon])
  


  useEffect(() => {

    if (!lat) return  
    const getDailyData = async () => {
      const getApi = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,snowfall_sum,uv_index_max,uv_index_clear_sky_max,weather_code&timezone=auto`)
      
      const response = await getApi.json()

      setDailyTempMax(response?.daily?.temperature_2m_max)
      setDailyTempMin(response?.daily?.temperature_2m_min)
      setDailyTime(response?.daily?.time)

      console.log(response.daily)
    }


    getDailyData()
  }, [lat, lon])
  
  useEffect(() => {
    if (dailyTime) {

      const dayIndex = dailyTime.map((d) => {
        const newDate = new Date(d)
        return dayArray[newDate.getDay()]
      })

      const dailyDataArray = dailyTempMax?.map((d, i) => ({
        day: dayIndex[i].slice(0,3),
              max: d,
              min: dailyTempMin[i],
        }))

        console.log(dayIndex)
        setAllDailyData(dailyDataArray)
    }
  }, [dailyTempMax])

  useEffect(() => {
    const getHourlyWeather = async () => {

      const getApi = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timezone=auto')

      const response = await getApi.json()

      const hourlyTime = response?.hourly?.time.slice(0, 8).map((t) => {
        return t.split('T')[1].split(':')[0]
      })
      const hourlyTemp = response?.hourly?.temperature_2m.slice(0, 8)
      
      const hourlyForecast = hourlyTime.map((t, i) => ({
        time: t,
        temp: hourlyTemp[i]
      }))

      setHourlyForecastWeather(hourlyForecast)
      // console.log(await getApi.json())
    }
    
    getHourlyWeather()
  }, [lat, lon])




    console.log(geoDetails)
  console.log(currentWeather)
  console.log(lon, lat)
  console.log(dailyTempMax, dailyTempMin, dailyTime)
  console.log(allDailyData)
    
    
  return (
    <div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-32 w-[100%] h-[100%]'>

        {/* current weather */}
        {/* col-left */}
        <div className='col-span-2 flex flex-col sm:gap-32 lg:gap-48'>
            {
            geoDetails && currentWeather &&
              <div className='flex items-center flex-col justify-center gap-32'>
                <div className='px-24 py-0 md:py-80 rounded-20 bg-[url("/src/assets/images/bg-today-small.svg")] md:bg-[url("/src/assets/images/bg-today-large.svg")] w-[343px] h-[286px] md:w-[720px] lg:w-[800px] flex items-center justify-center md:justify-between flex-col md:flex-row gap-16 md:gap-0'>
                        <div className='flex flex-col gap-12 items-center md:items-start justify-center'>
                          <h1 className='text-preset-4'>{geoDetails?.name}, {geoDetails?.country}</h1>
                          <p className='text-preset-6'>{day}, {month} {date}, { year}</p>
                        </div>
                  
                        <div className='flex items-center justify-center gap-20 w-[294px] '>
                          <img src="/src/assets/images/icon-sunny.webp" alt="" className='w-[120px] h-[120px]'/>
                          <h1 className='text-preset-1'>{Math.round(currentWeather.apparent_temperature)}°</h1>
                        </div>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24 w-[100%]'>
                  <div className='px-20 py-20 bg-neutral-800 border-neutral-600 flex gap-24 flex-col rounded-12'>
                    <p className='text-preset-6'>Feels Like</p>
                    <p className='text-preset-3'>{ currentWeather.apparent_temperature}°</p>
                  </div>
                  
                  <div className='px-20 py-20 bg-neutral-800 border-neutral-600 flex gap-24 flex-col rounded-12'>
                    <p className='text-preset-6'>Humidity</p>
                    <p className='text-preset-3'>{ currentWeather.relative_humidity_2m}%</p>
                  </div>

                  <div className='px-20 py-20 bg-neutral-800 border-neutral-600 flex gap-24 flex-col rounded-12'>
                    <p className='text-preset-6'>Wind</p>
                    <p className='text-preset-3'>{ currentWeather.wind_speed_10m} km/h</p>
                  </div>

                  <div className='px-20 py-20 bg-neutral-800 border-neutral-600 flex gap-24 flex-col rounded-12'>
                    <p className='text-preset-6'>Precipitation</p>
                    <p className='text-preset-3'>{ currentWeather.precipitation} mm</p>
                  </div>

                </div>
              </div>
          }
          
          {/* daily forecast */}
          <div className='flex flex-col gap-20 items-start'>
            <p className='text-preset-5a'>Daily forecast</p>

            <div className='flex items-center justify-center gap-16 w-[100%]'>

              {
                allDailyData.map((d, index) => 
                <div className='flex flex-col items-center justify-center rounded-12 gap-16 px-10 py-16 bg-neutral-800 border-neutral-600 flex-1' key={index}>
                <p className='text-preset-6'>{d.day}</p>
                <img src="/src/assets/images/icon-storm.webp" alt="" className='w-[60px] h-[60px]' />
                <div className='flex items-center justify-between w-full'>
                  <p className='text-preset-7'>{Math.floor( d.max)}°</p>
                  <p className='text-preset-7'>{Math.floor( d.min)}°</p>
                </div>
              </div>
                )
              }
              

            </div>
          </div>
        </div>




        {/* hourly forecast weather */}
        {/* col-right */}
        <div className='col-span-1 rounded-20 px-24 py-24 bg-neutral-800 flex flex-col items-center gap-16'>

          <div className='flex items-center justify-between w-full'>
            <h1 className='text-preset-5a'>Hourly Forecast</h1>
            <div className='flex items-center gap-12 select-none cursor-pointer rounded-8 bg-neutral-600 px-16 py-8' >
              <p className='text-preset-7 font-medium capitalize'>{ day }</p>
              <img src='/src/assets/images/icon-dropdown.svg' alt="" />
            </div>
          </div>

          {
            hourlyForecastWeather.map((hw, i) => (
              <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600' key={i}>
                <div className='flex gap-8 items-center'>
                  <img src="/src/assets/images/icon-rain.webp" alt=""  className='w-[40px] h-[40px]'/>
                  <p className='text-preset-5b'>{ hw.time } { hw.time > 12 ? "PM" : "AM" }</p>
                </div>
                <p className='text-preset-7'>{Math.floor( hw.temp)}°</p>
              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}