import sunny from "./images/icon-sunny.webp";
import storm from "./images/icon-storm.webp";
import snow from "./images/icon-snow.webp";
import rain from "./images/icon-rain.webp";
import cloudy from "./images/icon-partly-cloudy.webp";
import overcast from "./images/icon-overcast.webp";
import fog from "./images/icon-fog.webp";
import drizzle from "./images/icon-drizzle.webp";

const weatherIcons = {
  sunny: sunny,
  storm: storm,
  snow: snow,
  rain: rain,
  cloudy: cloudy,
  overcast: overcast,
  fog: fog,
  drizzle: drizzle,
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
};
