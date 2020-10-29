// import fetchCountries from './js/fetchCountries.js';
// fetchCountries();
import countryTmpl from './templates/countryMarkup.hbs';
const refs = {
  countryContainer: document.querySelector('.country-container'),
};

fetch('https://restcountries.eu/rest/v2/name/canada')
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
    const markup = countryTmpl(country);
    console.log('markup', markup);
    refs.countryContainer.innerHTML = markup;
  })
  .catch(error => {
    console.log(error);
  });
