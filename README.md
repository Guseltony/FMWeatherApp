# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). 
Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity, UV index, pressure, visibility, wind speed, and sunrise/sunset times
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown 
- Switch between light and dark mode
- Compare the weather between two different cities
- Save favorite cities for quick access
- Use voice search through speech recognition functionality
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Auto-detect their current location using the browser geolocation API

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://tonywx.vercel.app)

## My process

### Built with

- Semantic HTML5 markup
- [React](https://reactjs.org/) - JS library
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- Mobile-first workflow
- Flexbox & CSS Grid
- Context API for state management
- Custom Weather API integration

### What I learned

While building this project I learned:

- How to implement **speech recognition** using `speechSynthesis` API
- How to implement **auto-location detection** using `navigator.geolocation.getCurrentPosition`
- How to use **Promise.all** to wait for multiple API calls to resolve
- How to structure a React app by creating **Context Providers**
- Creating a separate **weatherApi.js** file to handle API requests and logic
- Managing themes with **light and dark mode**
- Implementing **favorites** and local storage persistence

### Continued development

Things I plan to improve in the future:

- Add **animated backgrounds** for different weather conditions (rain, snow, sunny, etc.)
- Convert app into a **PWA (Progressive Web App)**
- Improve the **weather comparison feature** with more detailed metrics and visualization
- Add **GSAP animations** for smoother UI/UX interactions

### Useful resources

- [MDN Web Docs - Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) - Helpful for implementing auto-location detection.
- [MDN Web Docs - SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) - For implementing voice search functionality.
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Essential reference for styling the app.

## Author

- Frontend Mentor - [@guseltony](https://www.frontendmentor.io/profile/guseltony)
- Twitter/X - [@guselt_code](https://x.com/guselt_code)
