import { TfiReload } from "react-icons/tfi";
import { useWeather } from "../context/weatherContext";

const Error = () => {

  const { setReload, setError } = useWeather()

  const handleReload = () => {
    setReload(true)
    setError(false)
  }
  
  return (
    <div className="w-full">
      <div className='text-center flex items-center justify-center pt-40 flex-col gap-24'>
        <img src="/src/assets/images/icon-error.svg" alt="" className='w-[42px] h-[50px]' />
        <p className='text-preset-2'>Something went wrong</p>
        <p className='text-preset-5b'>We couldn’t connect to the server (API error). Please try again in a few moments.</p>
        <div className='flex items-center justify-center gap-10 px-16 py-12 rounded-8 bg-neutral-800 cursor-pointer' onClick={() => handleReload()}>
          <TfiReload />
          <p className='text-preset-7'>Retry</p>
        </div>
      </div>
    </div>
  )
}

export default Error