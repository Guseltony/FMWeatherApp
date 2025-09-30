import React, { useEffect, useRef, useState } from "react";
import { useFavorites, useWeather } from "../context/weatherContext";
import { FaHeartCircleMinus } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa6";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import { LuAudioWaveform } from "react-icons/lu";

export const Search = () => {
  const { place, setPlace, searching, setSearching } = useWeather();
  const { favorites, showFavorites, setShowFavorites } = useFavorites();

  const [value, setValue] = useState("");
  const [showSearch, setShowSearch] = useState(true);

  const wrapperRef = useRef(null); // 👈 to track clicks outside
  const inputRef = useRef(null); 

  // Show dropdown when clicking div
  const handleClick = () => {
    if (favorites.length !== 0 && value === "") {
      setShowFavorites(true);
      setShowSearch(false);
    }
  };

   const {result, isRecording, startRecording, stopRecording} = useSpeechRecognition()


  // Hide dropdown while typing, re-show if cleared
  useEffect(() => {
    if (value !== "") {
      setShowFavorites(false);
      setShowSearch(true)
    } if (value === '' && favorites.length !== 0 && document.activeElement === inputRef.current) {
      setShowFavorites(true)
      setShowSearch(false)
    }  if (searching) {
      setShowSearch(false)
      setShowFavorites(false)
    }
      if(!searching){
      // setShowFavorites(true)
      setShowSearch(true)
    } 

    // else {
    //   if (favorites.length > 0) {
    //     setShowFavorites(true);
    //   }
    // }
  }, [value, favorites.length, searching]);

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

  // inside Search component
useEffect(() => {
  if (result) {
    setValue(result);
    console.log("🎤 Updated input with:", result);
  }
}, [result]);


  const getGeoLocation = async () => {
    if (value.trim() === "") return;

    await setPlace(value);
    setValue("");
    setShowFavorites(false);
    setSearching(true);
    setShowSearch(true);
  };

  const handleFavClick = (fav) => {
    if (fav === place) {
      setShowFavorites(false);
      setShowSearch(true)
      return;
    }
    setPlace(fav);
    setSearching(true);
    setShowFavorites(false);
  };

const handleMic = () => {
  console.log("Mic clicked. isRecording:", isRecording);
  if (!isRecording) {
    startRecording();
  } else {
    stopRecording();
  }
};


  

  return (
    <div
      className="relative w-[100%] flex items-center justify-center"
      ref={wrapperRef}
    >
      <div className="flex items-center gap-12 md:gap-16 w-[100%] xl:w-[656px] h-[124px] md:h-[56px] flex-col md:flex-row relative">
        
        <div className="w-[100%] relative">
          <div
            className="px-24 py-16 flex items-center gap-16 bg-neutral-800 rounded-12 w-[100%] h-[100%] hover:bg-neutral-700 transition-all duration-200 ease-in focus-within:outline-2 focus-within:outline-neutral-0 focus-within:outline-offset-2"
            onClick={handleClick}
          >
            <div className="cursor-pointer" onClick={() => handleMic()}>
          {
            isRecording ? <LuAudioWaveform size={24} className="text-red-500"/> : 
              <FaMicrophone size={24} className="text-blue-500 hover:text-blue-700"/>
          }
        </div>
            <img src="/src/assets/images/icon-search.svg" alt="" />
            <input
              type="text"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder="Search for a place..."
              ref={inputRef}
              className="text-preset-5b font-medium border-0 outline-0 w-full"
            />
          </div>

          {/* Searching State */}
          {searching && (
            <div className="absolute left-0 z-50 px-8 py-8 flex items-center mt-12 bg-neutral-800 rounded-12 w-[100%] md:w-[526px] h-[55] hover:bg-neutral-700 transition-all duration-200 ease-in">
              <div className="px-8 py-10 flex gap-10 rounded-8">
                <img
                  src="/src/assets/images/icon-loading.svg"
                  alt=""
                  className="animate-spin"
                />
                <p className="text-preset-7">Search in progress</p>
              </div>
            </div>
          )}

          {/* Favorites Dropdown */}
          {favorites.length > 0 && showFavorites && (
            <div className="absolute left-0 mt-12 z-50 w-[100%] ">
              <div className="flex flex-col items-center justify-center px-8 py-8 bg-neutral-800 rounded-[12px] relative">
                {favorites?.map((fav, index) => (
                  <div
                    key={index}
                    className="w-[100%] h-[55] hover:bg-neutral-700 outline-0 hover:border-neutral-600 rounded-8 transition-all duration-200 ease-in cursor-pointer flex items-center justify-between"
                  >
                    <p
                      className="text-preset-7 w-full px-8 py-10"
                      onClick={() => handleFavClick(fav)}
                    >
                      {fav}
                    </p>
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
          onClick={() => getGeoLocation()}
        >
          Search
        </button>
      </div>
    </div>
  );
};
