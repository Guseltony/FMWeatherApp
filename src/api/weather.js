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

export const getCurrentWeather = async (lat, lon, metric) => {
  const metricRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,uv_index,weather_code,visibility,surface_pressure,is_day&daily=sunrise,sunset&timezone=auto`
  );

  const metricData = await metricRes.json();

  const metricCurrentData = metricData?.current;

  const metricDailyData = metricData?.daily;

  const metricUnit = await metricData?.current_units;

  const imperialRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure,uv_index,visibility,is_day&daily=sunrise,sunset&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
  );

  const imperialData = await imperialRes.json();

  const imperialCurrentData = await imperialData?.current;

  const imperialUnit = await imperialData?.current_units;

  const weatherData = {
    data: metric ? metricCurrentData : imperialCurrentData,
    unit: metric ? metricUnit : imperialUnit,
    sunriseSunset: metricDailyData,
  };

  return weatherData;
};

// daily forecast weather api call

export const getDailyData = async (lat, lon, metric) => {
  const getMetricApi = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&timezone=auto`
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

  const daysList = await dailyTime.map((dateStr, index) => {
    const dateObj = new Date(dateStr);
    const dayName = dayArray[dateObj.getDay()];

    return {
      index, // same index as in daily[]
      date: dateStr, // e.g. "2025-09-29"
      dayName, // e.g. "Monday"
    };
  });

  const dailyForecastData = weatherCode.map((w, i) => ({
    day: dayIndex[i].slice(0, 3),
    max: metric ? dailyTempMax[i] : imperialTempMax[i],
    min: metric ? dailyTempMin[i] : imperialTempMin[i],
    code: w,
  }));

  return { dailyForecastData, daysList };
};

// hourly weather forecast api call

export const getHourlyWeather = async (lat, lon, hour, metric) => {
  const getMetricApi = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,uv_index,visibility,surface_pressure,weather_code&timezone=auto`
  );

  const getImperialApi = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
  );

  const imperialResponse = await getImperialApi.json();

  const response = await getMetricApi.json();

  const hourlyTime = response?.hourly?.time
    ?.slice(hour + 1, hour + 11)
    .map((t) => {
      return t.split("T")[1].split(":")[0];
    });

  const hourlyTemp = response?.hourly?.temperature_2m?.slice(
    hour + 1,
    hour + 11
  );

  const hourlyImperialTemp = imperialResponse?.hourly?.temperature_2m?.slice(
    hour + 1,
    hour + 11
  );

  const weatherCode = response?.hourly?.weather_code?.slice(
    hour + 1,
    hour + 11
  );

  const hourlyForecast = hourlyTime.map((t, i) => ({
    time: t,
    temp: metric ? hourlyTemp[i] : hourlyImperialTemp[i],
    code: weatherCode[i],
  }));

  return hourlyForecast;
};

// temp metric for switching days

export const fetchWeatherForSelectedDay = async (
  lat,
  lon,
  selectedDay,
  metric
) => {
  const getApi = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,uv_index,visibility,surface_pressure,weather_code&timezone=auto`
  );

  const imperialApi = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,visibility,wind_speed_10m,uv_index,precipitation&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
  );

  const impRes = await imperialApi.json();

  const res = await getApi.json();

  const data = metric ? res?.hourly : impRes?.hourly;

  const time = data.time;

  const targetTimeStamp = `${selectedDay}T12:00`;

  const index = time.findIndex((t) => t === targetTimeStamp);

  const timeSlice = data?.time.slice(0, 10);
  const tempSlice = data?.temperature_2m?.slice(0, 10);
  const codeSlice = data?.weather_code?.slice(0, 10);

  if (index === -1) return null;

  return {
    time: targetTimeStamp,
    apparent_temperature: data.apparent_temperature[index],
    precipitation: data.precipitation[index],
    temperature_2m: data.temperature_2m[index],
    surface_pressure: data.surface_pressure[index],
    relative_humidity_2m: data.relative_humidity_2m[index],
    uv_index: data.uv_index[index],
    visibility: data.visibility[index],
    weather_code: data.weather_code[index],
    wind_speed_10m: data.wind_speed_10m[index],
    fullHourly: timeSlice.map((t, i) => ({
      time: t?.split("T")[1].split(":")[0],
      temp: tempSlice[i],
      code: codeSlice[i],
    })),
  };
};

// compare weather

export const getCompareWeather = async (lat, lon) => {
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



