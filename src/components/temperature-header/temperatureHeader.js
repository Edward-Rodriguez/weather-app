import './temperatureHeader.css';
import { format } from 'date-fns';

export default function temperatureHeader(weatherData, forecastData) {
  const weatherInfo = weatherData;
  const forecastInfo = forecastData;
  const container = document.createElement('div');
  const locationHeader = document.createElement('h2');
  const time = document.createElement('p');
  const tempDiv = document.createElement('div');
  const temperature = document.createElement('h1');
  const tempScale = document.createElement('span');
  const forecastDiv = document.createElement('div');
  const condition = document.createElement('div');
  const hiTemp = document.createElement('span');
  const loTemp = document.createElement('span');
  const weatherIcon = document.createElement('img');
  const celsiusDegree = '\u2103';
  const farenheitDegree = '\u2109';

  container.setAttribute('id', 'temperature-header');
  locationHeader.setAttribute('id', 'location');
  locationHeader.textContent = `${weatherInfo.location}, ${weatherInfo.region}`;
  time.setAttribute('id', 'date');
  time.textContent = format(
    new Date(weatherInfo.localtime),
    'EEEE, do MMM yy pp',
  );
  tempDiv.setAttribute('id', 'temp-container');
  temperature.textContent = weatherInfo.temperatureFarenheit;
  temperature.setAttribute('id', 'current-temp');
  tempScale.textContent = farenheitDegree;
  tempScale.setAttribute('id', 'temp-scale');
  tempDiv.append(temperature, tempScale);

  // forecast div with icon, condition, hi & lo
  condition.textContent = weatherInfo.weatherCondition;
  condition.setAttribute('id', 'condition');
  weatherIcon.src = weatherInfo.weatherIcon;
  hiTemp.textContent = `Hi: ${forecastInfo.maxTemperatureFarenheit}${farenheitDegree}`;
  hiTemp.setAttribute('id', 'hiTemp');
  loTemp.setAttribute('id', 'loTemp');
  loTemp.textContent = `Lo: ${forecastInfo.minTemperatureFarenheit}${farenheitDegree}`;
  forecastDiv.setAttribute('id', 'current-forecast');
  forecastDiv.append(weatherIcon, condition, hiTemp, loTemp);

  container.append(locationHeader, time, tempDiv, forecastDiv);

  return container;
}
