// import fetchCountries from './js/fetchCountries.js';
// fetchCountries();
import countryTmpl from './templates/countryMarkup.hbs';
const debounce = require('lodash.debounce');

const refs = {
  countryContainer: document.querySelector('.js-country-container'),
  serchForm: document.querySelector('.js-search-form'),
};

refs.serchForm.addEventListener('input', debounce(onFormInput, 500));

function onFormInput(e) {
  let form = e.target;
  console.log('onFormInput -> form', form);
  const countryName = form.value;

  fetchCountryByName(countryName)
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    });
}

function fetchCountryByName(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(
    response => {
      return response.json();
    },
  );
}

function renderCountryCard(country) {
  const markup = countryTmpl(country);
  refs.countryContainer.innerHTML = markup;
  refs.serchForm.value = '';
}
