const meteoStatBaseURL = 'https://api.meteostat.net/v1/';
const openWeatherBaseURL = 'https://api.openweathermap.org/data/2.5/weather?';
const moment = require('moment');
const apiKeys = require('../config/apiKeys');

export default {

  getWeatherStationId: (city) => {
    return fetchData(`${meteoStatBaseURL}stations/search?q=${city}&key=${apiKeys.MEDEOSTAT_API_KEY}`)
  },

  getWeatherHistoryByStationId: (stationId, endDate) => {
    return fetchData(`${meteoStatBaseURL}history/hourly?station=${stationId}&start=${moment(endDate - 3.1e+11).format('YYYY-MM-DD')}&end=${moment(endDate).format('YYYY-MM-DD')}&key=${apiKeys.MEDEOSTAT_API_KEY}`)
  },

  getStationIdByCoords: (latitude, longitude) => {
    return fetchData(`${meteoStatBaseURL}stations/nearby?lat=${latitude}&lon=${longitude}&limit=5&key=${apiKeys.MEDEOSTAT_API_KEY}`)
  },

  getWeatherNow: (cityName) => {
    return fetchData(`${openWeatherBaseURL}q=${cityName}&appid=${apiKeys.OPENWEATHER_API_KEY}`)
  },

  getWeatherNowByCoords: (latitude, longitude) => {
    return fetchData(`${openWeatherBaseURL}lat=${latitude}&lon=${longitude}&appid=${apiKeys.OPENWEATHER_API_KEY}`)
  }
}

function fetchData (url) {
  return fetch(url)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching from ${url}...`)
    });
}