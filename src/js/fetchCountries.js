// export default function fetchCountries(searchQuery) {
//   console.log('export grom fetchCoutries');
// }

const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountryByName(countryName) {
  return fetch(`${BASE_URL}/name/${countryName}`).then(response => {
    return response.json();
  });
}

export default { fetchCountryByName };
