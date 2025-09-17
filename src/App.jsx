import Header from "./components/Header"
import HeroText from "./components/HeroText"
import WeatherPanel from "./components/WeatherPanel"


function App() {


  return (
    <>
      <div className="bg-neutral-900 px-16 md:px-24 lg:px-112 pt-16 pb-48 md:pt-24 md:pb-80 lg:pt-48 lg:pb-80 min-w-screen h-[100dvh]">
        <Header />
        <HeroText />
        <WeatherPanel />
      </div>
    </>
  )
}

export default App
