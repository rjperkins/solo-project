import React from 'react'


const WeatherNow = ({ weatherNow }) => {

  const weatherIconPath = '../../icons';

  function setWeatherImage (weatherCode) {
    const sanitized = weatherCode.replace(' ', '-');
    return `${weatherIconPath}${sanitized}.svg`;
  }

  return (
    <div className="weather_now">
      <img className="description"
        src={weatherNow.weather && setWeatherImage(weatherNow.weather[0].description)} alt="" height="87"
        width="100"
      />
      <div className="temperature">{weatherNow.weather && (weatherNow.main.temp - 273.15).toFixed(1)}°C</div>
      {/* <div className="wind_direction">🔻 {weatherNow.weather && weatherNow.wind.deg}</div> */}
      <div className="wind_speed">{weatherNow.weather && (weatherNow.wind.speed).toFixed(1)} m/s</div>
    </div >
  )
}

export default WeatherNow;