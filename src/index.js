import './assets/css/styles.css';

//  prettier-ignore
const dataController = (function () {
  async function getCurrentWeather(location) {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=684d4e5264b04f99a1d142811231412&q=${location}`);
      const weatherData = await response.json();
      console.log(weatherData);
    } catch (err) {
      console.err(err);
    }
  }

  async function getForecast(location) {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=684d4e5264b04f99a1d142811231412&q=${location}`);
      const forecastData = await response.json();
      console.log(forecastData);
    } catch (err) {
      console.err(err);
    }
  }

  return { getCurrentWeather, getForecast };
}());

dataController.getCurrentWeather('London');
dataController.getForecast('London');
