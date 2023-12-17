import './forecastBar.css';
import forecastDetail from './forecastDetail';
import thermoststatIcon from '../../assets/icons/thermostat-white.svg';
import humidityIcon from '../../assets/icons/humidity-percentage.svg';
import rainIcon from '../../assets/icons/rainy.svg';
import airIcon from '../../assets/icons/air.svg';

const forecastBar = (weatherData, forecastData) => {
  const container = document.createElement('div');
  const weatherInfo = weatherData;
  const forecastInfo = forecastData;
  const feelsLikeComponent = forecastDetail(
    'Feels Like',
    thermoststatIcon,
    `${weatherInfo.feelsLikeFarenheit}\u00B0`,
  );
  const humidityComponent = forecastDetail(
    'Humidity',
    humidityIcon,
    `${weatherInfo.humidity}\u0025`,
  );
  const rainChanceComponent = forecastDetail(
    'Rain Chance',
    rainIcon,
    `${forecastInfo.dailyChanceOfRain}\u0025`,
  );
  const windSpeedComponent = forecastDetail(
    'Wind Speed',
    airIcon,
    `${weatherInfo.windSpeedMph} mph`,
  );

  container.setAttribute('id', 'forecast-bar');
  container.append(
    feelsLikeComponent,
    humidityComponent,
    rainChanceComponent,
    windSpeedComponent,
  );
  return container;
};

export default forecastBar;
