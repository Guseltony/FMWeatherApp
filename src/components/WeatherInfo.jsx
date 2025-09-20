
import { CurrentWeather } from './CurrentWeather'
import { DailyForecast } from './DailyForecast'
import { HourlyForecast } from './HourlyForecast'

// import { fetchWeatherApi } from 'openmeteo';


export const WeatherInfo = () => {
  
  return (
    <div className='w-[100%]'>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-y-32 xl:gap-x-32 w-[100%] h-[100%] '>

        {/* current weather */}
        {/* col-left */}
        <div className='col-span-2 flex flex-col gap-32 xl:gap-48'>
          <CurrentWeather />
          
          {/* daily forecast */}

          <DailyForecast />
        </div>

        {/* hourly forecast weather */}
        {/* col-right */}

        <HourlyForecast />

      </div>

    </div>
  )
}