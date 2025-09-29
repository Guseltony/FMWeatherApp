import React, { useEffect, useState } from 'react'
import { FavoritesContext } from './weatherContext'

export const FavoritesProvider = ({ children }) => {
  
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)

  // call the localStorage
 
useEffect(() => {
  const store = JSON.parse(localStorage.getItem('favorites')) || []
  console.log("Loaded from localStorage:", store);
  setFavorites(store)
}, [])


  // call the saveItem

useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites))
}, [favorites])

  const addToFavorites = (place) => {

    console.log("Place received:", place, typeof place);
    
    if (!favorites.includes(place)) {
      setFavorites([...favorites, place]);
    }
    setShowFavorites(false)
  };

  const removeFromFavorites = (place) => {
    setFavorites(favorites.filter(fav => fav !== place))
    console.log(favorites)
  }

  console.log(favorites)


  return (
    <FavoritesContext.Provider value={{favorites, setFavorites, addToFavorites, removeFromFavorites, setShowFavorites, showFavorites}}>
      {children}
    </FavoritesContext.Provider>
  )
}
