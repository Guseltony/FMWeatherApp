import React, { useState } from 'react'
import { unitsArray } from './unitsArray'
import { Units } from './Units'
import { useWeather } from '../context/weatherContext'

const Header = () => {

  const [showDropDownUnits, setShowDropDownUnits] = useState(false)

  const {metric, setMetric} = useWeather()

  const handleSetMetric = () => {
    setShowDropDownUnits(true)
    setMetric(prev => !prev)
  }

  return (
    <div className='flex items-center justify-between'>
      {/* logo */}
      <div>
        <img src='/src/assets/images/logo.svg' alt="Weather Now" className='w-[137.9px] md:w-full'/>
      </div>

      {/* units */}
      <div className='relative px-10 py-8 md:px-16 md:py-12 bg-neutral-800 rounded-8' onClick={() => setShowDropDownUnits(prev => !prev)}>
        <div className='flex items-center gap-6 md:gap-10 select-none cursor-pointer' >
          <img src="/src/assets/images/icon-units.svg" alt="" />
          <p className='text-preset-7 font-medium capitalize'>units</p>
          <img src='/src/assets/images/icon-dropdown.svg' alt="" />
        </div>

        {/* dropdown */}
        {
          showDropDownUnits && 
            <div className='px-8 py-6 bg-neutral-800 border-1 border-neutral-600 flex gap-4 rounded-12 h-[412px] w-[214px] absolute right-0 top-48 flex-col z-[30]'>
              <div className='px-8 py-10 rounded-8 hover:bg-neutral-700 select-none cursor-pointer' onClick={() => handleSetMetric()}>
                <p className='text-preset-7 font-medium text-neutral-0'>{ metric ? 'Switch to Imperial' : 'Switch to Metric'}</p>
              </div>

              <div className='divide-y-[1px] divide-neutral-600'>
                {
                  unitsArray.map((u, index) => (
                    <Units key={index} {...u} metric={metric} setMetric={setMetric} />
                  ))
                }
              </div>

            </div>
        }
      </div>
    </div>
  )
}

export default Header