import React from 'react'
import './style.css';

function WeatherNow ({ weatherNow }) {

  let icon = weatherNow && weatherNow.weather && (weatherNow.weather[0].description).replace(' ', '-');
  const styles = weatherNow && weatherNow.weather && { transform: `rotate(${130 + weatherNow.wind.deg}deg)` }

  return (
    <div className="weather-now">
      <div className="icon">
        <img src={icon && require(`../../icons/${icon}.svg`) ? require(`../../icons/${icon}.svg`) : null} alt="desc"></img>
      </div>
      <div className="info">
        <div className="temperature">{weatherNow && weatherNow.weather && (weatherNow.main.temp - 273.15).toFixed(1)} °C</div>
        <div className="wind">
          <div className="wind_direction" style={styles}> ↙ </div>
          <div className="wind_speed">{weatherNow && weatherNow.weather && (weatherNow.wind.speed).toFixed(1)} m/s</div>
        </div>
      </div>
    </div >
  )
}

export default WeatherNow;