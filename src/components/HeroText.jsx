import React from 'react'
import { useWeather } from '../context/weatherContext'

const HeroText = () => {
  const { isDay } = useWeather()
  
  return (
    <div className='py-64'>
      <h1 className={`${ isDay ? 'text-blue-dark' : 'text-neutral-0'} text-preset-2 text-center font-bold`}>How's the sky looking today?</h1>
    </div>
  )
}

export default HeroText