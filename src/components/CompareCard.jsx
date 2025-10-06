// import React from 'react'
// import { WiHumidity } from "react-icons/wi";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { LuWind } from "react-icons/lu";


// export const CompareCard = ({city, icon, temp, tempUnit, description, hum, humUnit, wind, windUnit, removeCity}) => {
//   return (
//     <div className='bg-neutral-800 pt-12 pb-24 px-16 w-[100%] lg:w-[400px]'>
//       <AiTwotoneDelete className='text-lg text-red-700 cursor-pointer' onClick={() => removeCity(city)}/>
//       {
//             <div className='flex flex-col items-center justify-center'>
//               <h1 className='text-preset-4'>{city}</h1>
//               <img src={icon} alt="" className='w-[100px] h-[100px]' />
//               <p className='text-preset-2'>{Math.round(temp)} { tempUnit }</p>
//               <p className='text-preset-5a'>{description}</p>
//               <div className='flex items-center justify-between mt-12 w-[300px]'>
//                 <div className='flex items-center justify-center flex-col'>
//                   <p className="text-preset-7">Humidity</p>
//                   <div className='flex items-center justify-center gap-1'>
//                     <WiHumidity size={35}/>
//                     <p className='text-preset-3'>{Math.round(hum)}{humUnit}</p>
//                   </div>
//                 </div>
//                 <div className='flex items-center justify-center flex-col'>
//                   <p>Wind Speed</p>
//                   <div className='flex items-center justify-center gap-1'>
//                     <LuWind size={35}/>
//                     <p className='text-preset-3'>{ Math.round(wind)}{windUnit}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           }
//         </div>
//   )
// }

import { WiHumidity } from "react-icons/wi"
import { AiTwotoneDelete } from "react-icons/ai"
import { LuWind } from "react-icons/lu"
import { motion } from "framer-motion"


export const CompareCard = ({
  city,
  icon,
  temp,
  tempUnit,
  description,
  hum,
  humUnit,
  wind,
  windUnit,
  removeCity
}) => {
 
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className='relative bg-gradient-to-b from-neutral-800/80 to-neutral-900/80 backdrop-blur-md 
                 rounded-2xl shadow-lg hover:shadow-xl border border-neutral-700 
                 w-[100%] lg:w-[380px] p-6 flex flex-col items-center justify-center text-center'
    >
      {/* Delete button (top right) */}
      <button
        onClick={() => removeCity(city)}
        className='absolute top-4 right-4 p-2 rounded-full hover:bg-red-600/20 transition-colors'
        title='Remove city'
      >
        <AiTwotoneDelete className='text-red-500 hover:text-red-600 text-xl' />
      </button>

      {/* City Name */}
      <h1 className='text-2xl font-semibold text-white mb-2 tracking-wide'>
        {city}
      </h1>

      {/* Weather Icon */}
      <img
        src={icon}
        alt={description}
        className='w-[100px] h-[100px] drop-shadow-lg'
      />

      {/* Temperature */}
      <p className='text-4xl font-bold text-blue-400 mt-2'>
        {Math.round(temp)}{tempUnit}
      </p>

      {/* Description */}
      <p className='capitalize text-neutral-300 text-sm mt-1'>
        {description}
      </p>

      {/* Divider Line */}
      <div className='w-full border-t border-neutral-700 mt-4 mb-3'></div>

      {/* Details Section */}
      <div className='flex items-center justify-around w-full text-neutral-300'>
        {/* Humidity */}
        <div className='flex flex-col items-center gap-1'>
          <WiHumidity className='text-blue-400' size={36} />
          <p className='text-sm'>Humidity</p>
          <p className='text-lg font-semibold text-white'>
            {Math.round(hum)}{humUnit}
          </p>
        </div>

        {/* Wind */}
        <div className='flex flex-col items-center gap-1'>
          <LuWind className='text-cyan-400' size={32} />
          <p className='text-sm'>Wind</p>
          <p className='text-lg font-semibold text-white'>
            {Math.round(wind)}{windUnit}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
