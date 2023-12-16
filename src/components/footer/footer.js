import './footer.css';

const footer = () => {
  const container = document.createElement('div');
  const author = document.createElement('span');
  const site = document.createElement('a');
  const siteLink = 'https://backiee.com/wallpaper/fantasy/227438';

  container.setAttribute('id', 'footer');
  author.textContent = 'User635';
  site.textContent = 'backiee';
  site.href = siteLink;
  container.append('Photo by ', author, ' on ', site);

  return container;
};

export default footer;
