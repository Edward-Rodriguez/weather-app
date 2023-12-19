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
  const degreeSymbol = '\u00B0';
  const divider = document.createElement('span');
  let tempValue = weatherInfo.temperatureFarenheit;
  let maxTempValue = forecastInfo.maxTemperatureFarenheit;
  let minTempValue = forecastInfo.minTemperatureFarenheit;

  container.setAttribute('id', 'temperature-header');
  locationHeader.setAttribute('id', 'location');
  locationHeader.textContent = `${weatherInfo.location}, ${weatherInfo.region}`;
  time.setAttribute('id', 'date');
  time.textContent = format(new Date(weatherInfo.localtime), 'EEEE, MMM do p');
  condition.textContent = weatherInfo.weatherCondition;
  condition.setAttribute('id', 'condition');

  // temperature container
  tempDiv.setAttribute('id', 'temp-container');
  weatherIcon.src = weatherInfo.weatherIcon;
  temperature.textContent = Math.round(tempValue);
  temperature.setAttribute('id', 'current-temp');
  farenheitScale.textContent = farenheitDegree;
  farenheitScale.classList.add('scale-btn', 'active');
  farenheitScale.setAttribute('id', 'farenheit-btn');
  celsiusScale.textContent = celsiusDegree;
  celsiusScale.classList.add('scale-btn');
  divider.classList.add('divider');
  scaleDiv.append(farenheitScale, divider, celsiusScale);
  tempDiv.append(weatherIcon, temperature, scaleDiv);

  // forecast div with icon, condition, hi & lo

  hiTemp.textContent = `Hi: ${Math.round(maxTempValue)}${degreeSymbol}`;
  hiTemp.setAttribute('id', 'hiTemp');
  loTemp.setAttribute('id', 'loTemp');
  loTemp.textContent = `Lo: ${Math.round(minTempValue)}${degreeSymbol}`;
  forecastDiv.setAttribute('id', 'current-forecast');
  forecastDiv.append(hiTemp, loTemp);

  container.append(locationHeader, time, condition, tempDiv, forecastDiv);

  function convertToCelsius(tempToUpdate) {
    let newCelsiusTemp = tempToUpdate;
    newCelsiusTemp = Math.round((newCelsiusTemp - 32) * (5 / 9));
    return newCelsiusTemp;
  }

  function refreshTemperatureDisplay() {
    hiTemp.textContent = `Hi: ${Math.round(maxTempValue)}${degreeSymbol}`;
    loTemp.textContent = `Lo: ${Math.round(minTempValue)}${degreeSymbol}`;
    temperature.textContent = Math.round(tempValue);
  }

  function toggleActiveScale(ev) {
    if (ev.target.id === 'farenheit-btn') {
      farenheitScale.classList.add('active');
      celsiusScale.classList.remove('active');
    } else {
      farenheitScale.classList.remove('active');
      celsiusScale.classList.add('active');
    }
  }

  farenheitScale.addEventListener('click', (ev) => {
    tempValue = Math.round(weatherInfo.temperatureFarenheit);
    maxTempValue = Math.round(forecastInfo.maxTemperatureFarenheit);
    minTempValue = Math.round(forecastInfo.minTemperatureFarenheit);
    toggleActiveScale(ev);
    refreshTemperatureDisplay();
  });

  celsiusScale.addEventListener('click', (ev) => {
    tempValue = convertToCelsius(tempValue);
    maxTempValue = convertToCelsius(maxTempValue);
    minTempValue = convertToCelsius(minTempValue);
    toggleActiveScale(ev);
    refreshTemperatureDisplay();
  });

  return container;
}
