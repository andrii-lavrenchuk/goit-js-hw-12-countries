// import fetchCountries from './js/fetchCountries.js';
// fetchCountries();
import countryTmpl from './templates/countryMarkup.hbs';
import countryListTmpl from './templates/countryList.hbs';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');

const refs = {
  countryContainer: document.querySelector('.js-country-container'),
  serchForm: document.querySelector('.js-search-form'),
};

refs.serchForm.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  clearSerch();
  const form = e.target;
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
  console.log('renderCountryCard -> country', country);
  if (country.length > 10) {
    onError();
    return;
  }
  if (country.length >= 2 && country.length < 10) {
    const listMarkup = countryListTmpl(country);

    refs.countryContainer.innerHTML = listMarkup;

    onInfo();
    return;
  }
  if (country.length === 1) {
    const markup = countryTmpl(country);
    refs.countryContainer.innerHTML = markup;
    return;
  }
  onInfo();
}

function clearSerch() {
  refs.countryContainer.innerHTML = '';
}
// console.log(error());
function onError() {
  error({
    title: 'Title',
    text: 'To many matches found. Please enter a more specific query',
    delay: 1500,
  });
}

function onInfo() {
  info({
    text: 'Нема співпадінь',
    delay: 1000,
  });
}
