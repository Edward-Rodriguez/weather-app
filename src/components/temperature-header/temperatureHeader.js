import './temperatureHeader.css';
import { format } from 'date-fns';
import convertToCelsius from '../../celsiusConversion';

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
  const hiTempContainer = document.createElement('div');
  const hiTempValue = document.createElement('span');
  const loTempContainer = document.createElement('div');
  const loTempValue = document.createElement('span');
  const weatherIcon = document.createElement('img');
  const celsiusDegree = '\u2103';
  const farenheitDegree = '\u2109';
  const degreeSymbol = '\u00B0';
  const divider = document.createElement('span');
  const { temperatureFarenheit } = weatherInfo;
  const { maxTemperatureFarenheit } = forecastInfo;
  const { minTemperatureFarenheit } = forecastInfo;

  container.setAttribute('id', 'temperature-header');
  locationHeader.setAttribute('id', 'location');
  locationHeader.textContent = `${weatherInfo.location}, ${weatherInfo.region}`;
  time.setAttribute('id', 'date');
  time.textContent = format(new Date(weatherInfo.localtime), 'EEEE, MMM do p');
  condition.textContent = weatherInfo.weatherCondition;
  condition.setAttribute('id', 'condition');

  // temperature container w/ condition & icon
  tempDiv.setAttribute('id', 'temp-container');
  weatherIcon.src = weatherInfo.weatherIcon;
  temperature.setAttribute('id', 'current-temp');
  temperature.dataset.tempFarenheit = Math.round(temperatureFarenheit);
  temperature.dataset.tempCelsius = convertToCelsius(temperatureFarenheit);
  temperature.textContent = temperature.dataset.tempFarenheit;
  farenheitScale.textContent = farenheitDegree;
  farenheitScale.classList.add('scale-btn', 'active');
  farenheitScale.setAttribute('id', 'farenheit-btn');
  celsiusScale.textContent = celsiusDegree;
  celsiusScale.classList.add('scale-btn');
  divider.classList.add('divider');
  scaleDiv.append(farenheitScale, divider, celsiusScale);
  tempDiv.append(weatherIcon, temperature, scaleDiv);

  // hi & lo containers
  hiTempContainer.setAttribute('id', 'hiTemp');
  hiTempValue.dataset.tempFarenheit = Math.round(maxTemperatureFarenheit);
  hiTempValue.dataset.tempCelsius = convertToCelsius(maxTemperatureFarenheit);
  hiTempValue.textContent = hiTempValue.dataset.tempFarenheit;
  hiTempContainer.append('Hi:', hiTempValue, degreeSymbol);
  loTempContainer.setAttribute('id', 'loTemp');
  loTempValue.dataset.tempFarenheit = Math.round(minTemperatureFarenheit);
  loTempValue.dataset.tempCelsius = convertToCelsius(minTemperatureFarenheit);
  loTempValue.textContent = loTempValue.dataset.tempFarenheit;
  loTempContainer.append('Lo:', loTempValue, degreeSymbol);
  forecastDiv.setAttribute('id', 'current-forecast');
  forecastDiv.append(hiTempContainer, loTempContainer);

  container.append(locationHeader, time, condition, tempDiv, forecastDiv);

  // function refreshTemperatureDisplay() {
  //   let tempValue = maxTemperatureFarenheit;
  //   let minTempValue = minTemperatureFarenheit;
  //   let maxTempValue = maxTemperatureFarenheit;
  //   if (!farenheitScale.classList.contains('active')) {
  //     tempValue = convertToCelsius(tempValue);
  //     maxTempValue = convertToCelsius(maxTempValue);
  //     minTempValue = convertToCelsius(minTempValue);
  //   }
  //   hiTemp.textContent = `Hi: ${Math.round(maxTempValue)}${degreeSymbol}`;
  //   loTemp.textContent = `Lo: ${Math.round(minTempValue)}${degreeSymbol}`;
  //   temperature.textContent = Math.round(tempValue);
  // }

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
    toggleActiveScale(ev);
    // refreshTemperatureDisplay();
  });

  celsiusScale.addEventListener('click', (ev) => {
    toggleActiveScale(ev);
    // refreshTemperatureDisplay();
  });

  return container;
}
