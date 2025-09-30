import React, { useEffect, useRef, useState } from 'react'
import { useWeather } from '../context/weatherContext'
import { fetchWeatherForSelectedDay, getHourlyWeather } from '../api/weather'
import { getWeatherIcons } from '../assets/weatherIcons'

export const HourlyForecast = () => {

  const { lat, lon, day, hour, metric, setError, isLoading, setHourly, showMore, daysList, selectedDay, setSelectedDay, todayDate,setReload } = useWeather()
  
  const [data, setData] = useState([])
    const [showDay, setShowDay] = useState(false)

    const wrapperRef = useRef()


  const handleDayClick = (date) => {
    setSelectedDay(date)
    setReload(true)
    }
  
      useEffect(() => {
        if (!lon || !lat || !data) return
        // if (!lat, !lon) return
        
        const fetchWeatherData = async () => {
          try {
            const weatherData = await getHourlyWeather(lat, lon, hour, metric, showMore)

            const selectedDayData = await fetchWeatherForSelectedDay(lat, lon, selectedDay)

            const selectedData = await selectedDayData?.fullHourly

            const currentDate = await todayDate?.toISOString().split('T')[0]

            const dataToShow = selectedDay && selectedDay !== currentDate ? selectedData : weatherData


            console.log("selectedDay:", selectedDay)
            console.log("currentDate:", currentDate)
            console.log("selectedDay = currentDate:", currentDate === selectedDay)

            const sliceData = dataToShow?.slice(0, 8)

            console.log(weatherData)
            if (weatherData) {
              setData(showMore ? dataToShow : sliceData)
              setHourly(true)
            }
          } catch (error) {
            setError(true)
            console.log(error)
          }
        }
    
        fetchWeatherData()
      }, [lat, lon, metric, hour, showMore, selectedDay, todayDate])
  
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

        console.log('hourly:', data)
        console.log('daysList:', daysList)


  if (isLoading) return (
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

  return (
    <>
      {lat && lon && data &&
        <div  className='col-span-1 rounded-20 px-16 py-20 md:px-24 md:py-24 bg-neutral-800 flex flex-col items-center gap-16' >
            <div className='flex items-center justify-between w-full relative' ref={wrapperRef}>
              <h1 className='text-preset-5a'>Hourly Forecast</h1>
              <div className='flex items-center gap-12 select-none cursor-pointer rounded-8 bg-neutral-600 px-16 py-8 relative'  onClick={ () => setShowDay(prev => !prev)}>
                <p className='text-preset-7 font-medium capitalize'>{ day }</p>
                <img src='/src/assets/images/icon-dropdown.svg' alt="" />
              </div>
                  {
                    showDay && 
                      <div className='px-8 py-8 flex items-center flex-col w-[214px] h-[313] gap-4 rounded-12 bg-neutral-800 border-neutral-600 absolute right-0 top-40 cursor-pointer z-[66]' >
                        {
                    daysList?.map((day, index) => {
                            return <p key={index} className={`${day.date === selectedDay ? 'bg-neutral-700' : ''} rounded-8 hover:bg-neutral-700 px-8 py-10 w-[100%]`} onClick={() => handleDayClick(day.date)}>{ day?.dayName}</p>
                          }
                          )
                        }
                      </div>
                  }
            </div>

            {/* {
              data?.map((hw, i) => (
                <div className='pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600' key={i}>
                  <div className='flex gap-8 items-center'>
                    <img src={getWeatherIcons(hw.code)} alt=""  className='w-[40px] h-[40px]'/>
                    <p className='text-preset-5b'>{ hw.time?.slice('')[0] === 0 ? hw.time.slice('')[1] : hw.time > 12 ? hw.time - 12 : hw.time} { hw?.time > 12 ? "PM" : "AM" }</p>
                  </div>
                  <p className='text-preset-7'>{Math.round( hw.temp)}°</p>
                </div>
              ))
            } */}

        <div
            className={`
              transition-all duration-500 ease-in-out overflow-hidden w-full flex flex-col items-center gap-16
              ${showMore ? 'max-h-[2000px] opacity-100' : 'max-h-[600px] opacity-90'}
            `}
          >
            {data?.map((hw, i) => (
              <div
                key={i}
                className="pr-16 pl-12 py-10 rounded-8 gap-8 flex items-center w-full justify-between bg-neutral-700 border-neutral-600 transition-all duration-300 ease-in-out transform"
              >
                <div className="flex gap-8 items-center">
                  <img src={getWeatherIcons(hw.code)} alt="" className="w-[40px] h-[40px]" />
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
