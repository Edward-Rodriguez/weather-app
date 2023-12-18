import './threeDayForecast.css';
import forecastDay from './forecastDay';

const threeDayForecast = (forecastData) => {
  const container = document.createElement('div');
  const forecastInfo = forecastData;

  container.setAttribute('id', 'threeDay-forecast-container');
  // skip current day
  forecastInfo.slice(1).forEach((day) => {
    const forecastComponent = forecastDay(day);
    container.append(forecastComponent);
  });

  return container;
};

export default threeDayForecast;
