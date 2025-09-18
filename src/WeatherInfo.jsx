import React, { useEffect, useState } from 'react'

// import { fetchWeatherApi } from 'openmeteo';


export const WeatherInfo = () => {

  const [currentWeather, setCurrentWeather] =  useState()
  const [geoDetails, setGeoDetails] =  useState()

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
    const getWeather = async () => {
      
      const geoApi = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=Ibadan')

      const geoData = await geoApi.json()

      const geoLoc = geoData?.results[0]

      const lat = geoLoc?.latitude
      const lon = geoLoc?.longitude 


      const res = await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=apparent_temperature,precipitation,wind_speed_10m,relative_humidity_2m`
     );

        const data = await res.json();
        
      const currentData = data?.current
      
      setCurrentWeather(currentData)
      setGeoDetails(geoLoc)
      }

      getWeather()
    }, []  )

    console.log(geoDetails)
    console.log(currentWeather)
    
    
  return (
    <div className='w-[1216px] h-[797px] border-2 border-red-900'>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-32 w-[100%] h-[100%]'>

        {/* current weather */}
        {/* col-left */}
        <div className='col-span-2 flex flex-col gap-48'>
            {
            geoDetails && currentWeather &&
              <div className='flex items-center flex-col justify-center gap-32'>
                <div className='px-24 py-80 rounded-20 bg-[url("/src/assets/images/bg-today-large.svg")] w-[800px] h-[286px] flex items-center justify-between'>
                        <div className='flex flex-col gap-12 items-start justify-center'>
                        <h1 className='text-preset-4'>{geoDetails?.name}, {geoDetails?.country}</h1>
                          <p className='text-preset-6'>{day}, {month} {date}, { year}</p>
                        </div>
                        <div className='flex items-center justify-center gap-20'>
                          <img src="/src/assets/images/icon-sunny.webp" alt="" className='w-[120px] h-[120px]'/>
                          <h1 className='text-preset-1'>{currentWeather.apparent_temperature}°</h1>
                        </div>
                </div>

                <div></div>
              </div>
          }
          
          {/* daily forecast */}
          <div>
            
          </div>
        </div>




        {/* hourly forecast weather */}
        {/* col-right */}
        <div className='col-span-1'>

        </div>

      </div>

    </div>
  )
}