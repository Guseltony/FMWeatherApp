const weatherIcons = {
  sunny: "/images/icon-sunny.webp",
  storm: "/images/icon-storm.webp",
  snow: "/images/icon-snow.webp",
  rain: "/images/icon-rain.webp",
  cloudy: "/images/icon-partly-cloudy.webp",
  overcast: "/images/icon-overcast.webp",
  fog: "/images/icon-fog.webp",
  drizzle: "/images/icon-drizzle.webp",
};

const weatherDescriptions = {
  sunny: "Sunny",
  storm: "Thunderstorm",
  snow: "Snowy",
  rain: "Rainy",
  cloudy: "Partly Cloudy",
  overcast: "Overcast",
  fog: "Foggy",
  drizzle: "Drizzle",
};

const weatherCodes = {
  sunny: [0],
  storm: [95, 96, 99],
  snow: [71, 73, 75, 77, 85, 86],
  rain: [61, 63, 65, 66, 67, 80, 81, 82],
  cloudy: [1, 2],
  overcast: [3],
  fog: [45, 48],
  drizzle: [51, 53, 55, 56, 57],
};

export const getWeatherIcons = (code) => {
  for (const [group, codes] of Object.entries(weatherCodes)) {
    if (codes.includes(code)) {
      return weatherIcons[group];
    }
  }
  return "/images/icon-sunny.webp"; // fallback
};

export const getWeatherDescription = (code) => {
  for (const [group, codes] of Object.entries(weatherCodes)) {
    if (codes.includes(code)) {
      return weatherDescriptions[group];
    }
  }
  return "Unknown";
};
