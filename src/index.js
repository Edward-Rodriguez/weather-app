/* eslint-disable operator-linebreak */
/* eslint-disable wrap-iife */
import './assets/css/styles.css';
import temperatureHeader from './components/temperature-header/temperatureHeader';
import footer from './components/footer/footer';
import forecastBar from './components/forecast-bar/forecastBar';
import searchBox from './components/searchbox/searchBox';
import threeDayForecast from './components/upcoming-forecast/threeDayForecast';

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

  function parseForecastJson(forecastDataJson) {
    const forecastDaysArray = [];
    const numOfDays = forecastDataJson.forecast.forecastday.length;
    for (let day = 0; day < numOfDays; day += 1) {
      const { date } = forecastDataJson.forecast.forecastday[day];
      const {
        maxtemp_f: maxTemperatureFarenheit,
        mintemp_f: minTemperatureFarenheit,
        daily_chance_of_rain: dailyChanceOfRain,
      } = forecastDataJson.forecast.forecastday[day].day;
      const { icon } = forecastDataJson.forecast.forecastday[day].day.condition;
      forecastDaysArray.push({
        maxTemperatureFarenheit,
        minTemperatureFarenheit,
        dailyChanceOfRain,
        date,
        icon,
      });
    }

    return forecastDaysArray;
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
    const threeDayForecastData = dataController.getForecast(location, 4);

    return Promise.all([weatherData, forecastData, threeDayForecastData]).then(
      (data) => {
        console.log(threeDayForecastData);
        const parsedWeatherData = dataController.parseWeatherJson(data[0]);
        const parsedForecastData = dataController.parseForecastJson(data[1]);
        const parsedThreeDayData = dataController.parseForecastJson(data[2]);
        console.log(parsedThreeDayData);

        // update all components except searchbox and footer
        clearTemperatureDisplayData();
        searchField.container.after(
          temperatureHeader(parsedWeatherData, parsedForecastData[0]),
          forecastBar(parsedWeatherData, parsedForecastData[0]),
          threeDayForecast(parsedThreeDayData),
        );
      },
    );
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
