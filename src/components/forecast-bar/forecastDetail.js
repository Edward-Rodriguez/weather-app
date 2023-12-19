import convertToCelsius from '../../celsiusConversion';

const forecastDetail = (title, icon, data) => {
  const container = document.createElement('div');
  const heading = document.createElement('h2');
  const image = document.createElement('img');
  const weatherData = document.createElement('p');
  const degreeSymbol = '\u00B0';

  container.classList.add('forecast-detail');
  heading.textContent = title;
  image.src = icon;

  // check if data contains a temperature value (degree)
  if (data.includes(degreeSymbol)) {
    const tempValue = data.split(degreeSymbol)[0];
    const temperature = document.createElement('span');
    temperature.dataset.tempFarenheit = tempValue;
    temperature.dataset.tempCelsius = convertToCelsius(tempValue);
    temperature.textContent = temperature.dataset.tempFarenheit;
    weatherData.append(temperature, degreeSymbol);
  } else {
    weatherData.textContent = data;
  }

  container.append(image, heading, weatherData);
  return container;
};

export default forecastDetail;
