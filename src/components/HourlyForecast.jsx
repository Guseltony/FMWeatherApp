import React, { useEffect, useState } from 'react'
import { useWeather } from '../context/weatherContext'
import { getHourlyWeather } from '../api/weather'
import { getWeatherIcons } from '../assets/weatherIcons'

export const HourlyForecast = () => {

    const { lat, lon, day, dayArray, hour } = useWeather()
  const [data, setData] = useState()
    const [showDay, setShowDay] = useState(false)
  
      useEffect(() => {
        if (!lat, !lon) return
        
        const fetchWeatherData = async () => {
          try {
            const weatherData = await getHourlyWeather(lat, lon, hour)

            console.log(weatherData)
            if(weatherData) setData(weatherData)
          } catch (error) {
            console.log(error)
          }
        }
    
        fetchWeatherData()
      }, [lat, lon, hour])

      console.log(data)



   if (!lon || !lat || !data) return (
    <div>
        {
          <div  className='col-span-1 rounded-20 px-16 py-20 md:px-24 md:py-24 bg-neutral-800 flex flex-col items-center gap-16' >
            <div className='flex items-center justify-between w-full relative'>
              <h1 className='text-preset-5a'>Hourly Forecast</h1>
              <div className='flex items-center gap-12 select-none cursor-pointer rounded-8 bg-neutral-600 px-16 py-8 relative'>
                <p className='text-preset-7 font-medium capitalize'>-</p>
                <img src='/src/assets/images/icon-dropdown.svg' alt="" />
              </div>
            </div>
           
            <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600 h-[60px]' >
            </div>
            <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600 h-[60px]' >
            </div>
            <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600 h-[60px]' >
            </div>
            <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600 h-[60px]' >
            </div>
            <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600 h-[60px]' >
            </div>
            <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600 h-[60px]' >
            </div>
            <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600 h-[60px]' >
            </div>
            <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600 h-[60px]' >
            </div>

        </div>
        }
        </div>
      )

      console.log(data)
  return (
    <>
      {lat && lon && data &&
        <div  className='col-span-1 rounded-20 px-16 py-20 md:px-24 md:py-24 bg-neutral-800 flex flex-col items-center gap-16' >
            <div className='flex items-center justify-between w-full relative'>
              <h1 className='text-preset-5a'>Hourly Forecast</h1>
              <div className='flex items-center gap-12 select-none cursor-pointer rounded-8 bg-neutral-600 px-16 py-8 relative'  onClick={ () => setShowDay(prev => !prev)}>
                <p className='text-preset-7 font-medium capitalize'>{ day }</p>
                <img src='/src/assets/images/icon-dropdown.svg' alt="" />
              </div>
                  {
                    showDay && 
                      <div className='px-8 py-8 flex items-center flex-col w-[214px] h-[313] gap-4 rounded-12 bg-neutral-800 border-neutral-600 absolute right-0 top-40 cursor-pointer'>
                        {
                          dayArray?.map((day, index) => 
                            <p key={index} className='rounded-8 hover:bg-neutral-700 px-8 py-10 w-[100%]'>{ day}</p>
                          )
                        }
                      </div>
                  }
            </div>

            {
              data?.map((hw, i) => (
                <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600' key={i}>
                  <div className='flex gap-8 items-center'>
                    <img src={getWeatherIcons(hw.code)} alt=""  className='w-[40px] h-[40px]'/>
                    <p className='text-preset-5b'>{ hw.time?.slice('')[0] === 0 ? hw.time.slice('')[1] : hw.time > 12 ? hw.time - 12 : hw.time} { hw?.time > 12 ? "PM" : "AM" }</p>
                  </div>
                  <p className='text-preset-7'>{Math.round( hw.temp)}°</p>
                </div>
              ))
            }
        </div>
      }
    </>

  )
}
