/* eslint-disable operator-linebreak */
/* eslint-disable wrap-iife */
import './assets/css/styles.css';
import temperatureHeader from './components/temperature-header/temperatureHeader';
import footer from './components/footer/footer';
import forecastBar from './components/forecast-bar/forecastBar';
import searchBox from './components/searchbox/searchBox';

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
  const defaultLocation = '10021';
  const searchField = searchBox();
  const footerComponent = footer();
  pageContainer.append(searchField.container, footerComponent);

  // delete all components except searchbox and footer
  function clearTemperatureDisplayData() {
    Array.from(pageContainer.children).forEach((childElement) => {
      if (
        childElement !== searchField.container &&
        childElement !== footerComponent
      ) {
        pageContainer.removeChild(childElement);
      }
    });
  }

  function updateDisplay(location) {
    const weatherData = dataController.getCurrentWeather(location);
    const forecastData = dataController.getForecast(location);

    return Promise.all([weatherData, forecastData]).then((data) => {
      const parsedWeatherData = dataController.parseWeatherJson(data[0]);
      const parsedForecastData = dataController.parseForecastJson(data[1]);

      // update all components except searchbox and footer
      clearTemperatureDisplayData();
      searchField.container.after(
        temperatureHeader(parsedWeatherData, parsedForecastData),
        forecastBar(parsedWeatherData, parsedForecastData),
        (document.createElement('div').textContent =
          '3day Forecast Placeholder'),
      );
    });
  }

  updateDisplay(defaultLocation);

  function handleSearchSubmit(ev) {
    ev.preventDefault();
    const newLocation = searchField.input.value;
    updateDisplay(newLocation)
      .then(() => searchField.clearErrorMsg())
      .catch(() => {
        searchField.setErrorMsg();
      });
  }

  searchField.form.addEventListener('submit', (ev) => handleSearchSubmit(ev));
  searchField.form.addEventListener('enter', (ev) => handleSearchSubmit(ev));
})();
