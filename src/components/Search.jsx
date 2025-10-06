import React, { useEffect, useRef, useState } from "react";
import { useFavorites, useWeather } from "../context/weatherContext";
import { FaMicrophone, FaLocationDot, FaHeart, FaHeartCircleMinus } from "react-icons/fa6";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import { LuAudioWaveform } from "react-icons/lu";
import { getGeoLoc } from "../api/weather";

export const Search = () => {
  const { setPlace, searching, setSearching, setIsLoading, setGeoCode, setLocation, setError, isLoading } = useWeather();
  const { favorites, showFavorites, setShowFavorites, removeFromFavorites } = useFavorites();

  const [value, setValue] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [allPlace, setAllPlace] = useState([])
  const [showAllPlace, setShowAllPlace] = useState(false)
  const [query, setQuery] = useState('')


  const wrapperRef = useRef(null); 
  const inputRef = useRef(null); 

const {result, isRecording, startRecording, stopRecording} = useSpeechRecognition()



  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowFavorites(false);
        setShowSearch(true);
      } 
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSearch]);

  // set speech result into out input value
  useEffect(() => {
    if (result) {
      setValue(result);
    }
  }, [result]);

  // remove and set search button for smaller screen

    useEffect(() => {
    if(isLoading && searching) {setShowSearch(false)} else setShowSearch(true)
  }, [isLoading, searching])
  

  // fetch all place or city with the value/place name

  const fetchAllPlacePossibility = async () => {

    setShowSearch(false)
    setSearching(true)
    setValue("");

    try {
      const allPlaceData = await getGeoLoc(query)

    setAllPlace(allPlaceData)

      if (allPlaceData) {
        setSearching(false)
      }

      setShowAllPlace(true)
      setShowSearch(true)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  // handle mic for speech synthesis

  const handleMic = () => {
    console.log("Mic clicked. isRecording:", isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
    };

  useEffect(() => {
    setQuery(value)
  }, [value])

  // enabling enter key === search btn
  
  const handleKeyDown = async (event) => {
    
    if (event.key === "Enter") {
      fetchAllPlacePossibility()
      
    }
  }

  // set weather metric and city for the clickedcity

  const handleCityClick = async ( lat, lon, town, country) => {

    await setPlace(query)
    setGeoCode({lat, lon})
    setLocation({town, country})
    setShowAllPlace(false)
    setIsLoading(true)
    if(showFavorites) {setShowFavorites(false)}
  }


  

  return (
    <div
      className="relative w-[100%] flex items-center justify-center"
      ref={wrapperRef}
    >
      <div className="flex items-center gap-12 md:gap-16 w-[100%] xl:w-[656px] h-[124px] md:h-[56px] flex-col md:flex-row relative">
        
        <div className="w-[100%] relative">
          <div
            className="px-24 py-16 flex items-center gap-16 bg-neutral-800 rounded-12 w-[100%] h-[100%] hover:bg-neutral-700 transition-all duration-200 ease-in focus-within:outline-2 focus-within:outline-neutral-0 focus-within:outline-offset-2"
          >
            <div className="cursor-pointer" onClick={() => handleMic()}>
              {
                isRecording ? <LuAudioWaveform size={24} className="text-red-500"/> : 
                  <FaMicrophone size={24} className="text-blue-500 hover:text-blue-700"/>
              }
            </div>
            <img src="/images/icon-search.svg" alt="" />
            <input
              type="text"
              onChange={(e) => {setValue(e.target.value.toLocaleLowerCase())}}
              value={value}
              placeholder="Search for a place..."
              onKeyDown={(e) => handleKeyDown(e)}
              ref={inputRef}
              className="text-preset-5b font-medium border-0 outline-0 w-full"
            />
            {
              favorites.length > 0 &&
                <FaHeart size={24} className="text-red-500 cursor-pointer" onClick={() => setShowFavorites(prev => !prev)}/>
            }
          </div>
          
          {/* Searching State */}
          {searching && (
            <div className="absolute left-0 z-50 px-8 py-8 flex items-center mt-12 bg-neutral-800 rounded-12 w-[100%] h-[55] hover:bg-neutral-700 transition-all duration-200 ease-in">
              <div className="px-8 py-10 flex gap-10 rounded-8">
                <img
                  src="/images/icon-loading.svg"
                  alt=""
                  className="animate-spin"
                />
                <p className="text-preset-7">Search in progress</p>
              </div>
            </div>
          )}

          {/* show favorite */}

          {favorites?.length > 0 && showFavorites && (
            <div className="absolute left-0 mt-12 z-50 w-[100%] ">
              <div className="flex flex-col items-center justify-center gap-4 px-8 py-8 bg-neutral-800 border-1 border-neutral-700 rounded-[12px] relative">
                {favorites?.map((f, index) => (
                  <div
                    key={index}
                    className="w-[100%] h-[55] hover:bg-neutral-700 outline-0 hover:border-neutral-600 rounded-8 transition-all duration-200 ease-in cursor-pointer flex items-center justify-between px-10 py-10" 
                  >
                    <div className="flex flex-row items-center gap-10 w-full" onClick={() => handleCityClick( f?.lat, f?.lon, f?.town, f?.country)}>
                      <FaLocationDot />
                      <p className="text-preset-7">{ f.town}, {f.country}</p>
                    </div>
                    <FaHeartCircleMinus onClick={() => removeFromFavorites(f?.lat, f?.lon)}/>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* all place Dropdown */}
          {allPlace?.length > 0 && showAllPlace && (
            <div className="absolute left-0 mt-12 z-50 w-[100%] ">
              <div className="flex flex-col items-center justify-center gap-4 px-8 py-8 bg-neutral-800 border-1 border-neutral-700 rounded-[12px] relative">
                {allPlace?.map((p, index) => (
                  <div
                    key={index}
                    className="w-[100%] h-[55] hover:bg-neutral-700 outline-0 hover:border-neutral-600 rounded-8 transition-all duration-200 ease-in cursor-pointer flex items-center px-10 py-10 gap-10" 
                    onClick={() => handleCityClick( p.latitude, p.longitude, p.name, p.country)}
                  >
                    <FaLocationDot />
                    <div>
                      <p className="text-preset-7">{p.name}, {p.admin1}, { p.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`${
            showSearch ? "block" : "hidden xl:block"
          } px-24 py-16 bg-blue-500 text-preset-5b font-medium rounded-12 cursor-pointer w-[100%] md:w-fit hover:bg-blue-700 transition-all duration-200 ease-in focus:outline-2 outline-blue-500 outline-offset-2`}
          onClick={() => fetchAllPlacePossibility()}
        >
          Search
        </button>
      </div>
    </div>
  );
};
