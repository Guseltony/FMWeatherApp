// geo location api call

export const getGeoLoc = async (place) => {
  const geoApi = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${place}`
  );

  const geoData = await geoApi.json();

  const geoLoc = geoData?.results[0];

  const lat = geoLoc?.latitude;

  const lon = geoLoc?.longitude;

  return { geoLoc, lat, lon };
};

// current weather api call

export const getCurrentWeather = async (lat, lon) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&timezone=auto`
  );

  const data = await res.json();

  const currentData = data?.current;

  return currentData;
};

// daily forecast weather api call

export const getDailyData = async (lat, lon) => {
  const getApi = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,snowfall_sum,uv_index_max,uv_index_clear_sky_max,weather_code&timezone=auto`
  );

  const response = await getApi.json();

  const dailyTime = await response?.daily?.time;
  const dailyTempMax = await response?.daily?.temperature_2m_max;
  const dailyTempMin = await response?.daily?.temperature_2m_min;

  const dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayIndex = dailyTime.map((d) => {
    const newDate = new Date(d);
    return dayArray[newDate.getDay()];
  });

  const dailyForecastData = dailyTempMax?.map((d, i) => ({
    day: dayIndex[i].slice(0, 3),
    max: d,
    min: dailyTempMin[i],
  }));

  console.log(dayIndex);
  return dailyForecastData;
};

// hourly weather forecast api call

export const getHourlyWeather = async (hour) => {
  const getApi = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timezone=auto"
  );

  const response = await getApi.json();

  const hourlyTime = response?.hourly?.time
    .slice(hour + 1, hour + 9)
    .map((t) => {
      return t.split("T")[1].split(":")[0];
    });
  const hourlyTemp = response?.hourly?.temperature_2m.slice(hour + 1, hour + 9);

  const hourlyForecast = hourlyTime.map((t, i) => ({
    time: t,
    temp: hourlyTemp[i],
  }));

  return hourlyForecast;
};
