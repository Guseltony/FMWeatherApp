import React from 'react'
import { useWeather } from '../context/weatherContext'

export const Units = ({name, metricUnit, imperialUnit, metric}) => {

  const { isDay } = useWeather()
  
  return (
    <div className='flex flex-col gap-8'>
      <p className={`px-8 pt-6 text-preset-8 ${isDay ? 'text-neutral-600' : 'text-neutral-300'} capitalize w-fit`}>{name}</p>

      <div className='flex flex-col gap-4 pb-1'>
        <div className={`${metric && isDay ? 'bg-Nmode-bg' : metric ? 'bg-neutral-700' : ''} px-8 py-10 rounded-8 flex justify-between items-center`}>
          <p className={`text-preset-7  ${ metric && isDay ? 'text-neutral-0' : metric ? 'text-neutral-0' : ''}`}>{metricUnit}</p>
          {
            metric ? 
              <img src="/images/icon-checkmark.svg" alt="" /> : ''
          }
        </div>
        <div className={`${!metric ? 'bg-neutral-700' : ''} px-8 py-10 rounded-8 flex justify-between items-center`}>
          <p className={`text-preset-7  ${!metric ? 'text-neutral-0' : ''}`}>{imperialUnit}</p>
          {
            !metric ? 
              <img src="/images/icon-checkmark.svg" alt="" /> : ''
          }
        </div>
      </div>
    </div>
  )
}
