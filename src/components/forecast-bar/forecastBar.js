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
  const { feelsLikeFarenheit, humidity, windSpeedMph } = weatherInfo;
  const { dailyChanceOfRain } = forecastInfo;
  const degreeSymbol = '\u00B0';
  const percentSymbol = '\u0025';

  const feelsLikeComponent = forecastDetail(
    'Feels Like',
    thermoststatIcon,
    `${Math.round(feelsLikeFarenheit)}${degreeSymbol}`,
  );
  const humidityComponent = forecastDetail(
    'Humidity',
    humidityIcon,
    `${Math.round(humidity)}${percentSymbol}`,
  );
  const rainChanceComponent = forecastDetail(
    'Precipitation',
    rainIcon,
    `${Math.round(dailyChanceOfRain)}${percentSymbol}`,
  );
  const windSpeedComponent = forecastDetail(
    'Wind Speed',
    airIcon,
    `${Math.round(windSpeedMph)} mph`,
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
