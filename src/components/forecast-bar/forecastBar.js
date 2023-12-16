import './forecastBar.css';
import forecastDetail from './forecastDetail';
import thermoststatIcon from '../../assets/icons/thermostat-white.svg';

const forecastBar = (weatherData, forecastData) => {
  const container = document.createElement('div');
  const weatherInfo = weatherData;
  const forecastInfo = forecastData;
  const feelsLikeComponent = forecastDetail(
    'Feels like',
    thermoststatIcon,
    weatherInfo.feelsLikeFarenheit,
  );

  container.setAttribute('id', 'forecast-bar');
  container.append(feelsLikeComponent);
  return container;
};

export default forecastBar;
