import './searchBox.css';

const searchBox = () => {
  const container = document.createElement('div');
  const form = document.createElement('form');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const submit = document.createElement('button');
  const error = document.createElement('div');
  const searchFieldAttributes = {
    id: 'search',
    type: 'search',
    name: 'search',
    placeholder: 'Enter City or Zip Code',
  };

  label.setAttribute('id', 'search');
  Object.entries(searchFieldAttributes).forEach(([name, value]) => {
    input.setAttribute(name, value);
  });
  submit.setAttribute('type', 'submit');
  submit.textContent = 'Submit';
  error.setAttribute('id', 'error-msg');

  function setErrorMsg() {
    const errorMsg =
      'Location not found. Please enter a valid:\nCity, Zip, Country or IP address';
    error.textContent = errorMsg;
  }

  form.append(label, input, submit);
  container.append(form, error);

  return {
    container,
    form,
    input,
    setErrorMsg,
  };
};

export default searchBox;
