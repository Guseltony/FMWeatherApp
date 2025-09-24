import React, {  useState } from 'react'
import { useFavorites, useWeather } from '../context/weatherContext'
import { FaHeartCircleMinus } from "react-icons/fa6";

export const Search = () => {

  const { place, setPlace, searching, setSearching } = useWeather()

  const {favorites, showFavorites, setShowFavorites} = useFavorites()

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

  // console.log(isSearching)

    const handleClick = () => setShowFavorites(true)

  
    if(value === '') setShowFavorites(false)
  
  const getGeoLocation = async () => {

    if(value.trim() === '') return
      
    await setPlace(value)
    setValue('')
    setShowFavorites(false)
    setSearching(true)

    }

  const handleFavClick = (fav) => {
    if (fav === place) { setShowFavorites(false); return}
    setPlace(fav)
    setShowFavorites(false)
    setSearching(true)
  }
  
  // document.addEventListener('click', () => {
  //   setShowFavorites(false)
  // })

  


  return (
    <div className='relative w-[100%] flex items-center justify-center'>
      <div className='flex items-center gap-12 md:gap-16 w-[100%] xl:w-[656px] h-[124px] md:h-[56px] flex-col md:flex-row relative'>
        <div className='w-[100%] relative'>
          <div className='px-24 py-16 flex items-center gap-16 bg-neutral-800 rounded-12 w-[100%] h-[100%] hover:bg-neutral-700 transition-all duration-200 ease-in focus-within:outline-2 focus-within:outline-neutral-0 focus-within:outline-offset-2' onClick={ () => handleClick() }>
            <img src="/src/assets/images/icon-search.svg" alt="" />
            <input type="text" onChange={(e) => setValue(e.target.value.trim()) } value={value} placeholder='Search for a place...' className='text-preset-5b font-medium border-0 outline-0 w-full' />
          </div>

        
            {
              searching &&
                <div className='absolute left-0 z-50 px-8 py-8 flex items-center mt-12 bg-neutral-800 rounded-12 w-[100%] md:w-[526px] h-[55] hover:bg-neutral-700 transition-all duration-200 ease-in'>
                  <div className='px-8 py-10 flex gap-10 rounded-8'>
                    <img src="/src/assets/images/icon-loading.svg" alt="" className='animate-spin'/>
                    <p className='text-preset-7'>Search in progress</p>
                  </div>
                </div>
            }

            {
              ( favorites.length > 0 && showFavorites ) &&
            <div className="absolute left-0 mt-12 z-50 w-[100%] ">
                <div className='flex flex-col items-center justify-center px-8 py-8 bg-neutral-800 rounded-[12px] relative'>
                  {  
                  favorites?.map((fav, index) => (
                      <div className='w-[100%] h-[55] hover:bg-neutral-700 outline-0 hover:border-neutral-600 rounded-8 transition-all duration-200 ease-in cursor-pointer flex items-center justify-between' key={index} >
                      <p className='text-preset-7 w-full px-8 py-10 ' onClick={() => handleFavClick(fav)}>{fav}</p>
                    </div>
                  ))
                    }
                </div>
              </div>
            }
          
        </div>

        <button type="submit" className={`${showFavorites ? 'hidden xl:block' : 'block' } px-24 py-16 bg-blue-500 text-preset-5b font-medium rounded-12 cursor-pointer w-[100%] md:w-fit hover:bg-blue-700 transition-all duration-200 ease-in focus:outline-2 outline-blue-500 outline-offset-2`} onClick={ () => getGeoLocation() }>Search</button>
      </div>

      {/* <div className='absolute left-0'>
        {
          searching &&
            <div className='px-8 py-8 flex items-center mt-8 bg-neutral-800 rounded-12 w-[100%] md:w-[526px] h-[55] hover:bg-neutral-700 transition-all duration-200 ease-in'>
              <div className='px-8 py-10 flex gap-10 rounded-8'>
                <img src="/src/assets/images/icon-loading.svg" alt="" className='animate-spin'/>
                <p className='text-preset-7'>Search in progress</p>
              </div>
            </div>
        }
      </div> */}
    </div>
  )
}
