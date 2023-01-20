export const environment = {
  production: false,
  uri: 'https://api.openweathermap.org/data/2.5/weather',
  uriSearch: 'https://api.openweathermap.org/geo/1.0/direct',
  units: 'metric',
  appid: process.env['API_KEY'],
};
