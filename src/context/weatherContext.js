import { createContext, useContext } from "react";

export const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);
