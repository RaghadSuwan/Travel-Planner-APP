const axios = require("axios");

const getWeatherData = (apiKey, lat, lon) => {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&units=M&days=7&key=${apiKey}`;

  return axios.get(url)
    .then(response => {
      const data = response.data;
      if (data && data.data.length > 0) {
        const weather = data.data[0];
        return {
          high: weather.high_temp,
          low: weather.low_temp,
          weather: weather.weather.description,
        };
      } else {
        console.log("Weather data is not available");
        return {};
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      return {};
    });
};

module.exports = getWeatherData;