import React, {  useState } from 'react'
import { useWeather } from '../context/weatherContext'

export const Search = () => {

  const { place, setPlace } = useWeather()
  const [value, setValue] = useState()


  // const getPlaceGeo = async () => {
  //   setPlace(place)
  //   await getGeoLoc(place);
  //   setValue('')
  // }

  // getPlaceGeo();

  // useEffect(() => {

  // }, [])

  console.log(place)


  
  
  const getGeoLocation = async () => {
      
      await setPlace(value)
      setValue('')
    }



  return (
    <div className='flex items-center gap-12 md:gap-16 w-[100%] xl:w-[656px] h-[124px] md:h-[56px] flex-col md:flex-row'>
      <div className='px-24 py-16 flex items-center gap-16 bg-neutral-800 rounded-12 w-[100%] h-[100%]'>
        <img src="/src/assets/images/icon-search.svg" alt="" />
        <input type="text" onChange={(e) => setValue(e.target.value.trim()) } value={value} placeholder='Search for a place...' className='text-preset-5b font-medium border-0 outline-0' />
      </div>
      <button type="submit" className='px-24 py-16 bg-blue-500 text-preset-5b font-medium rounded-12 cursor-pointer w-[100%] md:w-fit' onClick={ () => getGeoLocation() }>Search</button>
    </div>
  )
}
