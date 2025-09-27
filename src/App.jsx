
import { useEffect } from "react"
import CompareWeather from "./components/CompareWeather"
import Error from "./components/Error"
import Header from "./components/Header"
import HeroText from "./components/HeroText"
import WeatherPanel from "./components/WeatherPanel"
import { useWeather } from "./context/weatherContext"


function App() {

  const {error, showCompare} = useWeather()


  //   useEffect(() => {
  //   if (showCompare) {
  //     document.body.style.overflow = "hidden";
  //     document.documentElement.style.overflow = "hidden"; // 🔹 also html
  //   } else {
  //     document.body.style.overflow = "auto";
  //     document.documentElement.style.overflow = "auto";
  //   }
  
  //   return () => {
  //     document.body.style.overflow = "auto";
  //     document.documentElement.style.overflow = "auto";
  //   };
  // }, [showCompare]);


  return (
    <>
      <div className="bg-neutral-900 px-16 md:px-24 lg:px-112 pt-16 pb-48 md:pt-24 md:pb-80 lg:pt-48 lg:pb-80 min-w-screen min-h-[100dvh] relative">
        <div className="relative">
          <Header />
          {
            error ? <Error /> : <div>
              <HeroText />
              <WeatherPanel />
            </div>
          }
        </div>
        {
          showCompare && 
            <CompareWeather />
        }
      </div>
    </>
  )
}

export default App
