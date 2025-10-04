import React, { useState } from 'react'
import { getCurrentWeather, getGeoLoc } from '../api/weather'
import { getWeatherDescription, getWeatherIcons } from '../assets/weatherIcons'
import { CompareCard } from './CompareCard'
import { useFavorites, useWeather } from '../context/weatherContext'
import { TbColumnsOff } from "react-icons/tb";
import { FaCircleMinus } from "react-icons/fa6";

const CompareWeather = () => {

  const [cities, setCities] = useState([])
  const [value, setValue] = useState()
  const [weatherArray, setWeatherArray] = useState([])
  const { setShowCompare} = useWeather()

  const {favorites} = useFavorites()

const handleAddCity = (value) => {
  if(value === '') return
  setCities([...cities, value])
    setValue('')
  }
  
  const handleCompareOff = () => setShowCompare(false)


  const handleCompareWeather = () => {
  const getCityWeather = async () => {
    const results = await Promise.all(
      cities.map(async (city) => {
        // 🔹 fetch geolocation for THIS city only
        const cityGeo = await getGeoLoc(city)

        // if getGeoLoc returns a single object
        const weather = await getCurrentWeather(cityGeo.lat, cityGeo.lon)

        // if it sometimes returns multiple possible matches, use map:
        // const weather = await Promise.all(cityGeo.map(r => getCurrentWeather(r.lat, r.lon)))

        return { city, weather }
      })
    )

    setWeatherArray(results)
  }

  getCityWeather()
  }
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddCity(value);
    }
  }

  console.log('fav:', favorites)

  const removeCity = (id) => {
    const filterWeatherArray = weatherArray.filter(w => w.city !== id)
    const filterCityArray = cities.filter( c => c !== id)

    setWeatherArray(filterWeatherArray)
    setCities(filterCityArray)
 }

 console.log('weather:',weatherArray)


  return (

    <div className='bg-black/70 backdrop-blur-2xl w-full h-[100%] absolute top-0 left-0  z-50 px-16 lg:flex items-center justify-center'>
      <div className='flex items-center justify-center flex-col gap-24'>
        <TbColumnsOff className='text-red-700 text-xl absolute top-20 right-20 cursor-pointer' onClick={() => handleCompareOff()}/>
        {/* adding cities */}
        <div className='flex items-center justify-center flex-col xl:flex-row gap-16 w-[100%] mt-96 lg:mt-0'>
          <input
            type="text"
            placeholder='type a city name'
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyDown={(e) => handleKeyDown(e)}
            className='text-preset-5b font-medium border-0 outline-0 w-[100%] xl:w-[656px] h-[56px] bg-neutral-800 rounded-12 hover:bg-neutral-700 transition-all duration-200 pl-24 py-16' />
          <button type="submit" className='px-24 py-16 bg-blue-500 text-preset-5b font-medium rounded-12 cursor-pointer w-[100%] md:w-fit hover:bg-blue-700 transition-all duration-200 ease-in focus:outline-2 outline-blue-500 outline-offset-2' onClick={() => handleAddCity(value)}>Add</button>
        </div>

        {/* comparing city */}

        <div className='flex flex-col items-center justify-center gap-12 mt-12'>
          <div className='flex gap-12 items-center justify-center mb-4'>
            {
              cities && 
              cities.map((c, index) => (
                <div className='bg-blue-800 pl-16 pr-8 py-2 flex items-center gap-8'>
                  <p key={index} className='text-preset-7'>{c}</p>
                  <FaCircleMinus onClick={() => removeCity(c)} className='cursor-pointer'/>
                </div>
                ))
            }
          </div>
          {
            cities.length >= 2 &&
              <button type="submit" className='px-24 py-16 bg-blue-500 text-preset-5b font-medium rounded-12 cursor-pointer w-[100%] md:w-fit hover:bg-blue-700 transition-all duration-200 ease-in focus:outline-2 outline-blue-500 outline-offset-2' onClick={() => handleCompareWeather(value)}>Compare</button>
          }
        </div>

        <div className='flex flex-col xl:flex-row items-center justify-center gap-24'>
          {
  weatherArray.map((w, i) => {
    const data = w.weather.metricCurrentData;
    const unit = w.weather.metricUnit;
    const icon = getWeatherIcons(data?.weather_code);
    const description = getWeatherDescription(data?.weather_code);

    return (
      <CompareCard
        key={i}
        city={w.city}
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
    );
  })
}

        </div>
      </div>
    </div>
  )
}

export default CompareWeather