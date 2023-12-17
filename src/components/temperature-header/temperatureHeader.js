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
  const scaleDiv = document.createElement('div');
  const farenheitScale = document.createElement('button');
  const celsiusScale = document.createElement('button');
  const forecastDiv = document.createElement('div');
  const condition = document.createElement('div');
  const hiTemp = document.createElement('span');
  const loTemp = document.createElement('span');
  const weatherIcon = document.createElement('img');
  const celsiusDegree = '\u2103';
  const farenheitDegree = '\u2109';
  const divider = document.createElement('span');
  let tempValue = weatherInfo.temperatureFarenheit;
  let maxTempValue = forecastInfo.maxTemperatureFarenheit;
  let minTempValue = forecastInfo.minTemperatureFarenheit;

  container.setAttribute('id', 'temperature-header');
  locationHeader.setAttribute('id', 'location');
  locationHeader.textContent = `${weatherInfo.location}, ${weatherInfo.region}`;
  time.setAttribute('id', 'date');
  time.textContent = format(new Date(weatherInfo.localtime), 'EEEE, MMM do p');

  // temperature container
  tempDiv.setAttribute('id', 'temp-container');
  temperature.textContent = Math.round(tempValue);
  temperature.setAttribute('id', 'current-temp');
  farenheitScale.textContent = farenheitDegree;
  farenheitScale.classList.add('scale-btn');
  farenheitScale.setAttribute('id', 'farenheit-btn');
  celsiusScale.textContent = celsiusDegree;
  celsiusScale.classList.add('scale-btn');
  divider.classList.add('divider');
  scaleDiv.append(farenheitScale, divider, celsiusScale);
  tempDiv.append(temperature, scaleDiv);

  // forecast div with icon, condition, hi & lo
  condition.textContent = weatherInfo.weatherCondition;
  condition.setAttribute('id', 'condition');
  weatherIcon.src = weatherInfo.weatherIcon;
  hiTemp.textContent = `Hi: ${Math.round(maxTempValue)}\u00B0`;
  hiTemp.setAttribute('id', 'hiTemp');
  loTemp.setAttribute('id', 'loTemp');
  loTemp.textContent = `Lo: ${Math.round(minTempValue)}\u00B0`;
  forecastDiv.setAttribute('id', 'current-forecast');
  forecastDiv.append(weatherIcon, condition, hiTemp, loTemp);

  container.append(locationHeader, time, tempDiv, forecastDiv);

  function convertToCelsius(tempToUpdate) {
    let newCelsiusTemp = tempToUpdate;
    newCelsiusTemp = Math.round((newCelsiusTemp - 32) * (5 / 9));
    return newCelsiusTemp;
  }

  function refreshTemperatureDisplay() {
    hiTemp.textContent = `Hi: ${Math.round(maxTempValue)}\u00B0`;
    loTemp.textContent = `Lo: ${Math.round(minTempValue)}\u00B0`;
    temperature.textContent = Math.round(tempValue);
  }

  farenheitScale.addEventListener('click', () => {
    tempValue = Math.round(weatherInfo.temperatureFarenheit);
    maxTempValue = Math.round(forecastInfo.maxTemperatureFarenheit);
    minTempValue = Math.round(forecastInfo.minTemperatureFarenheit);
    refreshTemperatureDisplay();
  });

  celsiusScale.addEventListener('click', () => {
    tempValue = convertToCelsius(tempValue);
    maxTempValue = convertToCelsius(maxTempValue);
    minTempValue = convertToCelsius(minTempValue);
    refreshTemperatureDisplay();
  });

  return container;
}
