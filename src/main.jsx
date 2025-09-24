import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WeatherProvider } from './context/WeatherProvider.jsx'
import { FavoritesProvider } from './context/FavoritesProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </WeatherProvider>
  </StrictMode>,
)
