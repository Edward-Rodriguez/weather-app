/* eslint-disable wrap-iife */
import './assets/css/styles.css';
import temperatureHeader from './components/temperature-header/temperatureHeader';

// prettier=ignore
const dataController = (function () {
  async function getCurrentWeather(location) {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=684d4e5264b04f99a1d142811231412&q=${location}`,
      );
      const weatherData = await response.json();
      return weatherData;
    } catch (err) {
      return err;
    }
  }

  async function getForecast(location, days = 1) {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=684d4e5264b04f99a1d142811231412&q=${location}&days=${days}`,
      );
      const forecastData = await response.json();
      return forecastData;
    } catch (err) {
      return err;
    }
  }

  function parseWeatherJson(weatherDataJson) {
    // console.log(weatherDataJson);
    const {
      name: location,
      region,
      country,
      localtime,
    } = weatherDataJson.location;
    const {
      temp_f: temperatureFarenheit,
      wind_mph: windSpeedMph,
      humidity,
      feelslike_f: feelsLikeFarenheit,
    } = weatherDataJson.current;
    const { text: weatherCondition, icon: weatherIcon } =
      weatherDataJson.current.condition;

    return {
      location,
      region,
      country,
      localtime,
      temperatureFarenheit,
      windSpeedMph,
      humidity,
      feelsLikeFarenheit,
      weatherCondition,
      weatherIcon,
    };
  }

  function parseForecastJson(forecastDataJson, day = 0) {
    const {
      maxtemp_f: maxTemperatureFarenheit,
      mintemp_f: minTemperatureFarenheit,
      daily_chance_of_rain: dailyChanceOfRain,
    } = forecastDataJson.forecast.forecastday[day].day;
    return {
      maxTemperatureFarenheit,
      minTemperatureFarenheit,
      dailyChanceOfRain,
    };
  }

  return {
    getCurrentWeather,
    getForecast,
    parseWeatherJson,
    parseForecastJson,
  };
})();
const location = '11420';
const weatherData = dataController.getCurrentWeather(location);
const forecastData = dataController.getForecast(location);

(function displayController() {
  const pageContainer = document.getElementById('page-container');

  Promise.all([weatherData, forecastData]).then((data) => {
    const parsedWeatherData = dataController.parseWeatherJson(data[0]);
    const parsedForecastData = dataController.parseForecastJson(data[1]);
    pageContainer.prepend(
      temperatureHeader(parsedWeatherData, parsedForecastData),
    );
  });
})();
