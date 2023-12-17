/* eslint-disable wrap-iife */
import './assets/css/styles.css';
import temperatureHeader from './components/temperature-header/temperatureHeader';
import footer from './components/footer/footer';
import forecastBar from './components/forecast-bar/forecastBar';

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

(function displayController() {
  const pageContainer = document.getElementById('page-container');
  const location = '11418';
  const weatherData = dataController.getCurrentWeather(location);
  const forecastData = dataController.getForecast(location);

  Promise.all([weatherData, forecastData]).then((data) => {
    const parsedWeatherData = dataController.parseWeatherJson(data[0]);
    const parsedForecastData = dataController.parseForecastJson(data[1]);
    pageContainer.append(
      temperatureHeader(parsedWeatherData, parsedForecastData),
      forecastBar(parsedWeatherData, parsedForecastData),
      footer(),
    );

    // set farenheit btn active
    const farenheitBtn = document.getElementById('farenheit-btn');
    farenheitBtn.click();
    farenheitBtn.focus();
  });
})();
