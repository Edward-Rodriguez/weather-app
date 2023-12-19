import format from 'date-fns/format';
import { parse } from 'date-fns';
import convertToCelsius from '../../celsiusConversion';

const forecastDay = (forecastData) => {
  const container = document.createElement('div');
  const day = document.createElement('h3');
  const icon = document.createElement('img');
  const hiTempContainer = document.createElement('div');
  const hiTempValue = document.createElement('span');
  const loTempContainer = document.createElement('div');
  const loTempValue = document.createElement('span');
  const degreeSymbol = '\u00B0';

  container.classList.add('upcoming-day-forecast');
  const date = parse(forecastData.date, 'yyyy-MM-dd', new Date());
  day.textContent = format(date, 'EEE');
  icon.src = forecastData.icon;

  hiTempContainer.classList.add('day-forecast-hitemp');
  hiTempValue.dataset.tempFarenheit = Math.round(
    forecastData.maxTemperatureFarenheit,
  );
  hiTempValue.dataset.tempCelsius = convertToCelsius(
    forecastData.maxTemperatureFarenheit,
  );
  hiTempValue.textContent = hiTempValue.dataset.tempFarenheit;
  hiTempContainer.append(hiTempValue, degreeSymbol);
  loTempContainer.classList.add('day-forecast-lotemp');
  loTempValue.dataset.tempFarenheit = Math.round(
    forecastData.minTemperatureFarenheit,
  );
  loTempValue.dataset.tempCelsius = convertToCelsius(
    forecastData.minTemperatureFarenheit,
  );
  loTempValue.textContent = loTempValue.dataset.tempFarenheit;
  loTempContainer.append(loTempValue, degreeSymbol);
  container.append(day, icon, hiTempContainer, loTempContainer);

  return container;
};

export default forecastDay;
