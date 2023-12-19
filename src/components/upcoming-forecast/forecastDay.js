import format from 'date-fns/format';
import { parse } from 'date-fns';

const forecastDay = (forecastData) => {
  const container = document.createElement('div');
  const day = document.createElement('h3');
  const icon = document.createElement('img');
  const hiTemp = document.createElement('div');
  const loTemp = document.createElement('div');
  const degreeSymbol = '\u00B0';

  container.classList.add('upcoming-day-forecast');
  const date = parse(forecastData.date, 'yyyy-MM-dd', new Date());
  day.textContent = format(date, 'EEE');
  icon.src = forecastData.icon;
  hiTemp.classList.add('day-forecast-hitemp');
  hiTemp.textContent = `${Math.round(
    forecastData.maxTemperatureFarenheit,
  )}${degreeSymbol}`;
  loTemp.classList.add('day-forecast-lotemp');
  loTemp.textContent = `${Math.round(
    forecastData.minTemperatureFarenheit,
  )}${degreeSymbol}`;
  container.append(day, icon, hiTemp, loTemp);

  return container;
};

export default forecastDay;
