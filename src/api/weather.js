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
  const metricRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&timezone=auto`
  );

  const metricData = await metricRes.json();

  const metricCurrentData = metricData?.current;

  const metricUnit = await metricData?.current_units;

  const imperialRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
  );

  const imperialData = await imperialRes.json();

  const imperialCurrentData = await imperialData?.current;

  const imperialUnit = await imperialData?.current_units;

  return { metricCurrentData, metricUnit, imperialCurrentData, imperialUnit };
};

// daily forecast weather api call

export const getDailyData = async (lat, lon, metric) => {
  const getMetricApi = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
  );

  const metricResponse = await getMetricApi.json();

  const dailyTime = await metricResponse?.daily?.time;
  const dailyTempMax = await metricResponse?.daily?.temperature_2m_max;
  const dailyTempMin = await metricResponse?.daily?.temperature_2m_min;
  const weatherCode = await metricResponse?.daily?.weather_code;

  const getImperialApi = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto`
  );

  const imperialResponse = await getImperialApi.json();

  const imperialTempMax = await imperialResponse?.daily?.temperature_2m_max;
  const imperialTempMin = await imperialResponse?.daily?.temperature_2m_min;

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

  const dailyForecastData = weatherCode.map((w, i) => ({
    day: dayIndex[i].slice(0, 3),
    max: metric ? dailyTempMax[i] : imperialTempMax[i],
    min: metric ? dailyTempMin[i] : imperialTempMin[i],
    code: w,
  }));

  return dailyForecastData;
};

// hourly weather forecast api call

export const getHourlyWeather = async (lat, lon, hour, metric) => {
  const getMetricApi = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=weather_code,temperature_2m`
  );

  const getImperialApi = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
  );

  const imperialResponse = await getImperialApi.json();

  const response = await getMetricApi.json();

  const hourlyTime = response?.hourly?.time
    ?.slice(hour + 1, hour + 9)
    .map((t) => {
      return t.split("T")[1].split(":")[0];
    });

  const hourlyTemp = response?.hourly?.temperature_2m?.slice(
    hour + 1,
    hour + 9
  );

  const hourlyImperialTemp = imperialResponse?.hourly?.temperature_2m?.slice(
    hour + 1,
    hour + 9
  );
  const weatherCode = response?.hourly?.weather_code?.slice(hour + 1, hour + 9);

  const hourlyForecast = hourlyTime.map((t, i) => ({
    time: t,
    temp: metric ? hourlyTemp[i] : hourlyImperialTemp[i],
    code: weatherCode[i],
  }));

  return hourlyForecast;
};
