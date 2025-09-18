import React from 'react'
import { Search } from './Search'
import { WeatherInfo } from './WeatherInfo'


const WeatherPanel = () => {
  return (
    <div className='flex items-center justify-center flex-col gap-32 lg:gap-48'>
      <Search />
      <WeatherInfo />
    </div>
  )
}

export default WeatherPanel