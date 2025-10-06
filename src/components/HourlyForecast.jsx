import React, { useEffect, useRef, useState } from 'react'
import { useWeather } from '../context/weatherContext'
import { fetchWeatherForSelectedDay, getHourlyWeather } from '../api/weather'
import { getWeatherIcons } from '../assets/weatherIcons'

export const HourlyForecast = () => {

  const { lat, lon, metric, setError, isLoading, setHourly, allSet, daysList, selectedDay, setSelectedDay, todayDate, day, setIsLoading, isDay, hour} = useWeather()
  
  const [data, setData] = useState([])
  const [showDay, setShowDay] = useState(false)
  const [foreCastDay, setForecastDay] = useState('')

    const wrapperRef = useRef()


  const handleDayClick = (date, name) => {
    setSelectedDay(date)
    setIsLoading(true)
    setForecastDay(name)
    }
  
      useEffect(() => {
        if (!lon || !lat || !data) return
        // if (!lat, !lon) return

        
        const fetchWeatherData = async () => {


          try {
            const weatherData = await getHourlyWeather(lat, lon, hour, metric)

            const selectedDayData = await fetchWeatherForSelectedDay(lat, lon, selectedDay, metric)

            const selectedData = await selectedDayData?.fullHourly

            const currentDate = todayDate ? new Date(todayDate).toISOString().split('T')[0] : null;


            const dataToShow = selectedDay && selectedDay !== currentDate ? selectedData : weatherData

            if (weatherData || selectedDayData) {
              setData(dataToShow)
              setHourly(true)
              setShowDay(false)
              setIsLoading(false)

            }
          } catch (error) {
            setError(true)
            console.log(error)
          }
        }
    
        fetchWeatherData()
      }, [lat, lon, metric, selectedDay, day, hour])
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
          setShowDay(false)
        } 
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [showDay]);

  if (isLoading || !allSet) return (
    <div>
        {
          <div  className='col-span-1 rounded-20 px-16 py-20 md:px-24 md:py-24 bg-neutral-800 flex flex-col items-center gap-16' >
            <div className='flex items-center justify-between w-full relative'>
              <h1 className='text-preset-5a'>Hourly Forecast</h1>
              <div className='flex items-center gap-12 select-none cursor-pointer rounded-8 bg-neutral-600 px-16 py-8 relative'>
                <p className='text-preset-7 font-medium capitalize'>-</p>
                <img src='/images/icon-dropdown.svg' alt="" />
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
            <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600 h-[60px]' >
            </div>
            <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600 h-[60px]' >
            </div>

        </div>
        }
        </div>
      )

  return (
    <>
      {lat && lon && data && allSet && daysList &&
        <div  className={`col-span-1 rounded-20 px-16 py-20 md:px-24 md:py-24 ${isDay ? 'bg-[#d9d9d9]' : 'bg-Nmode-bg'} flex flex-col items-center gap-16`} >
            <div className='flex items-center justify-between w-full relative' ref={wrapperRef}>
              <h1 className={`${isDay ? 'text-Lmode-text' : ''} text-preset-5a`}>Hourly Forecast</h1>
              <div className={`flex items-center gap-12 select-none cursor-pointer rounded-8 px-16 py-8 relative ${isDay ?  'bg-Lmode-bg text-Lmode-text' : 'bg-neutral-700 text-Nmode-text'} `}  onClick={ () => setShowDay(prev => !prev)}>
                <p className={`${isDay ?  ' text-Lmode-text' : ' text-Nmode-text'} text-preset-7 font-medium capitalize`}>{ selectedDay ? foreCastDay : day }</p>
                <img src='/images/icon-dropdown.svg' alt="" className={ `${isDay ? 'filter invert' : ''}`} />
              </div>
                  {
                    showDay && 
                      <div className={`px-8 py-8 flex items-center flex-col w-[214px] h-[313] gap-4 rounded-12 ${isDay ? 'bg-[#d9d9d9]' : 'bg-Nmode-bg'} border-1 border-neutral-600 absolute right-0 top-40 cursor-pointer z-[66]`} >
                        {
                    daysList?.map((day, index) => {
                            return <p key={index} className={`${day.date === selectedDay && isDay ? 'bg-neutral-500' : day.date === selectedDay ? 'bg-neutral-700' : ''} ${isDay ? 'text-Lmode-text hover:bg-[#fff]' : 'text-Nmode-text hover:bg-neutral-700'} rounded-8 px-8 py-10 w-[100%]`} onClick={() => handleDayClick(day?.date, day?.dayName)}>{ day?.dayName}</p>
                          }
                          )
                        }
                      </div>
                  }
            </div>

        <div
            className=
              'transition-all duration-500 ease-in-out overflow-hidden w-full flex flex-col items-center gap-16'
          
          >
            {data?.map((hw, i) => (
              <div
                key={i}
                className={`pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between ${isDay ? 'bg-Lmode-bg text-Lmode-text' : 'bg-neutral-700 text-Nmode-text'} border-neutral-600 transition-all duration-300 ease-in-out transform`}
              >
                <div className="flex gap-8 items-center">
                  <img src={getWeatherIcons(hw.code)} alt="" className={`w-[40px] h-[40px] ${isDay ? 'filter invert' : ''}`} />
                  <p className="text-preset-5b">
                    {hw.time?.slice('')[0] === 0 ? hw.time.slice('')[1] : hw.time > 12 ? hw.time - 12 : hw.time}
                    {hw?.time > 12 ? ' PM' : ' AM'}
                  </p>
                </div>
                <p className="text-preset-7">{Math.round(hw.temp)}°</p>
              </div>
            ))}
          </div>

        </div>
      }
    </>

  )
}
