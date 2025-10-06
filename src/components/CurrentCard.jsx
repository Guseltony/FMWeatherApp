import React from 'react'
import { useWeather } from '../context/weatherContext'

export const CurrentCard = ({title, dataDetails}) => {

  const { isDay, isLoading } = useWeather()
  
  return (
    <div className={`${isLoading ? 'bg-neutral-800 text-neutral-0' : isDay ?  'bg-Lmode-bg text-Lmode-text' : 'bg-Nmode-bg text-Nmode-text'} px-20 py-20 border-neutral-600 flex gap-24 flex-col rounded-12 `}>
      <p className='text-preset-6'>{ title}</p>
      <p className='text-preset-3'>{ dataDetails}</p>
    </div>
  )
}
