import React from 'react'
import { WiHumidity } from "react-icons/wi";
import { AiTwotoneDelete } from "react-icons/ai";
import { LuWind } from "react-icons/lu";


export const CompareCard = ({city, icon, temp, tempUnit, description, hum, humUnit, wind, windUnit, removeCity}) => {
  return (
    <div className='bg-neutral-800 pt-12 pb-24 px-16 w-[100%] lg:w-[400px]'>
      <AiTwotoneDelete className='text-lg text-red-700 cursor-pointer' onClick={() => removeCity(city)}/>
      {
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-preset-4'>{city}</h1>
              <img src={icon} alt="" className='w-[100px] h-[100px]' />
              <p className='text-preset-2'>{Math.round(temp)} { tempUnit }</p>
              <p className='text-preset-5a'>{description}</p>
              <div className='flex items-center justify-between mt-12 w-[300px]'>
                <div className='flex items-center justify-center flex-col'>
                  <p className="text-preset-7">Humidity</p>
                  <div className='flex items-center justify-center gap-1'>
                    <WiHumidity size={35}/>
                    <p className='text-preset-3'>{Math.round(hum)}{humUnit}</p>
                  </div>
                </div>
                <div className='flex items-center justify-center flex-col'>
                  <p>Wind Speed</p>
                  <div className='flex items-center justify-center gap-1'>
                    <LuWind size={35}/>
                    <p className='text-preset-3'>{ Math.round(wind)}{windUnit}</p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
  )
}
