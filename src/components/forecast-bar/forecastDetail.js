const forecastDetail = (title, icon, data) => {
  const container = document.createElement('div');
  const heading = document.createElement('h2');
  const image = document.createElement('img');
  const weatherData = document.createElement('p');

  container.classList.add('forecast-detail');
  heading.textContent = title;
  image.src = icon;
  weatherData.textContent = data;

  container.append(image, heading, weatherData);
  return container;
};

export default forecastDetail;
