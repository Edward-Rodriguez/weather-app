import './temperatureHeader.css';

export default function temperatureHeader(weatherData) {
  const container = document.createElement('div');
  const locationHeader = document.createElement('header');
  const time = document.createElement('div');
  const temperature = document.createElement('h1');
  const condition = document.createElement('div');
  const hiLoTemps = document.createElement('div');

  container.setAttribute('id', 'temperature-header');

  return container;
}
