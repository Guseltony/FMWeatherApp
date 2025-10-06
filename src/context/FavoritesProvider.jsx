
import React, { useEffect, useState } from 'react'
import { FavoritesContext } from './weatherContext'

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Load once on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(stored)
    setInitialized(true)
  }, [])

  // Save when favorites change (after initial load)
  useEffect(() => {
    if (initialized) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites, initialized])

// ✅ Add new favorite (unique by lat & lon)
const addToFavorites = (town, country, lat, lon) => {
  const exists = favorites.some(fav => fav.lat === lat && fav.lon === lon)

  if (!exists) {
    const newFav = { town, country, lat, lon }
    setFavorites(prev => [...prev, newFav])
    console.log('✅ Added favorite:', newFav)
  } else {
    console.log('⚠️ Already in favorites:', town, lat, lon)
  }

  setShowFavorites(false)
}

// ✅ Remove by lat & lon (more reliable than place name)
const removeFromFavorites = (lat, lon) => {
  setFavorites(prev => prev.filter(fav => fav.lat !== lat || fav.lon !== lon))
  console.log('🗑️ Removed favorite with coordinates:', lat, lon)
}


  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      showFavorites,
      setShowFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}
