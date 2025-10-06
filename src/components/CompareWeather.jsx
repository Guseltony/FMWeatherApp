
import React, { useState } from 'react'
import { getCurrentWeather, getGeoLoc } from '../api/weather'
import { getWeatherDescription, getWeatherIcons } from '../assets/weatherIcons'
import { CompareCard } from './CompareCard'
import { useWeather } from '../context/weatherContext'
import { TbColumnsOff } from "react-icons/tb";
import { FaCircleMinus, FaLocationDot } from "react-icons/fa6";

const CompareWeather = () => {
  const [cities, setCities] = useState([]) 
  const [value, setValue] = useState('')
  const [weatherArray, setWeatherArray] = useState([])
  const [allCities, setAllCities] = useState([])
  const [showAllCities, setShowAllCities] = useState(false)
  const { setShowCompare, metric } = useWeather()

  const handleAddCity = async (value) => {
    if (!value.trim()) return
    try {
      const allPlaceData = await getGeoLoc(value)
      setAllCities(allPlaceData)
      setShowAllCities(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectedCity = (name, admin1, country, lat, lon) => {
    const cityObj = { name, admin1, country, lat, lon }

    // Avoid duplicates
    if (!cities.some(c => c.name === name && c.country === country)) {
      setCities(prev => [...prev, cityObj])
    }

    // Clear dropdown & input
    setShowAllCities(false)
    setAllCities([])
    setValue('')
  }

  const handleCompareOff = () => setShowCompare(false)

  // ✅ Fetch weather for all selected cities
 
    const handleCompareWeather = async () => {
    
        try {
          const results = await Promise.all(
            cities.map(async (city) => {
              const weather = await getCurrentWeather(city.lat, city.lon, metric)
              return { ...city, weather }
            })
          )
          setWeatherArray(results)
        } catch (err) {
          console.log('Error comparing weather:', err)
        }
    }
    


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddCity(value);
    }
  }

  const removeCity = (name) => {
    setCities(cities.filter(c => c.name !== name))
    setWeatherArray(weatherArray.filter(w => w.name !== name))
  }

  return (
    <div className='bg-black/70 backdrop-blur-2xl w-full h-[100%] absolute top-0 left-0 z-50 px-16'>
      <div className='relative w-full flex items-center justify-center'>
        <TbColumnsOff className='text-red-700 text-xl absolute top-20 right-20 cursor-pointer' onClick={handleCompareOff} />

        <div className='flex items-center justify-center flex-col w-full gap-24 relative mt-[100px] lg:mt-[120px]'>
          {/* Input field */}
          <div className='flex relative w-[100%] md:w-[656px]'>
            <div className='flex items-center justify-center flex-row gap-16 md:w-[656px] w-[100%]'>
              <input
                type="text"
                placeholder='type a city name'
                onChange={(e) => setValue(e.target.value)}
                value={value}
                onKeyDown={handleKeyDown}
                className='text-preset-5b font-medium border-0 outline-0 w-[100%] md:w-[656px] h-[56px] bg-neutral-800 rounded-12 hover:bg-neutral-700 transition-all duration-200 pl-24 py-16'
              />
              <button
                type="submit"
                className='px-24 py-16 bg-blue-500 text-preset-5b font-medium rounded-12 cursor-pointer w-fit hover:bg-blue-700 transition-all duration-200 ease-in focus:outline-2 outline-blue-500 outline-offset-2'
                onClick={() => handleAddCity(value)}
              >
                Add
              </button>

            </div>
            {/* Dropdown list */}
            {allCities?.length > 0 && showAllCities && (
              <div className="absolute left-0 mt-[60px] z-50 w-[100%]">
                <div className="flex flex-col items-center justify-center gap-4 px-8 py-8 bg-neutral-800 border-1 border-neutral-700 rounded-[12px] relative w-[100%] md:w-[656px] border-2">
                  {allCities.map((p, index) => (
                    <div
                      key={index}
                      className="w-[100%] hover:bg-neutral-700 rounded-8 transition-all duration-200 ease-in cursor-pointer flex items-center px-10 py-10 gap-10"
                      onClick={() => handleSelectedCity(p.name, p.admin1, p.country, p.latitude, p.longitude)}
                    >
                      <FaLocationDot />
                      <div>
                        <p className="text-preset-7">{p.name}, {p.admin1}, {p.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Selected cities */}
          <div className='flex flex-col items-center justify-center gap-12 mt-12'>
            <div className='flex gap-12 items-center justify-center mb-4 flex-wrap'>
              {cities.map((c, index) => (
                <div key={index} className='bg-blue-800 pl-16 pr-8 py-2 flex items-center gap-8 rounded-md'>
                  <p className='text-preset-7'>{c.name}, {c.country}</p>
                  <FaCircleMinus onClick={() => removeCity(c.name)} className='cursor-pointer' />
                </div>
              ))}
            </div>

            {cities.length >= 2 && (
              <button
                type="submit"
                className='px-24 py-16 bg-blue-500 text-preset-5b font-medium rounded-12 cursor-pointer w-[100%] md:w-fit hover:bg-blue-700 transition-all duration-200 ease-in focus:outline-2 outline-blue-500 outline-offset-2'
                onClick={handleCompareWeather}
              >
                Compare
              </button>
            )}
          </div>

          {/* Comparison cards */}
          <div className='flex flex-col items-center justify-center gap-24 w-full relative'>

            <div className='flex flex-col md:flex-row flex-wrap items-center justify-center gap-24 w-full'>
              {weatherArray?.map((w, i) => {
                const data = w?.weather?.data
                const unit = w?.weather?.unit
                const icon = getWeatherIcons(data?.weather_code)
                const description = getWeatherDescription(data?.weather_code)

                return (
                  <CompareCard
                    key={i}
                    city={w.name}
                    icon={icon}
                    temp={data?.temperature_2m}
                    tempUnit={unit?.temperature_2m}
                    description={description}
                    hum={data?.relative_humidity_2m}
                    humUnit={unit?.relative_humidity_2m}
                    wind={data?.wind_speed_10m}
                    windUnit={unit?.wind_speed_10m}
                    removeCity={removeCity}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompareWeather
