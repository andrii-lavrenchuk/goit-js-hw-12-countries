import API from '../js/fetchCountries.js';
import countryTmpl from '../templates/countryMarkup.hbs';
import countryListTmpl from '../templates/countryList.hbs';
import getRefs from './getRefs.js';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');

const refs = getRefs();

refs.serchForm.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  clearSerch();
  const form = e.target;
  const searchQuery = form.value;

  API.fetchCountryByName(searchQuery)
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    });
}

function renderCountryCard(country) {
  if (country.length > 10) {
    onError();
    return;
  }
  if (country.length >= 2 && country.length < 10) {
    const listMarkup = countryListTmpl(country);

    refs.countryContainer.innerHTML = listMarkup;
    onToManyMatshesFound();
    return;
  }
  if (country.length === 1) {
    const markup = countryTmpl(country);
    refs.countryContainer.innerHTML = markup;
    return;
  }
  onMatchesNotFound();
}

function clearSerch() {
  refs.countryContainer.innerHTML = '';
}
function onError() {
  error({
    title: 'To many matches found.',
    text: 'Please enter a more specific query',
    delay: 1500,
  });
}

function onMatchesNotFound() {
  info({
    title: 'Matches no found',
    text: 'Please, try again',
    delay: 1500,
  });
}

function onToManyMatshesFound(params) {
  info({
    title: 'To many matches found',
    text: 'Please, enter one of the following country name',
    delay: 1500,
  });
}
