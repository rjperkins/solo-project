import React, { useState } from 'react';
import './style.css';


function LocationInput ({ updateLocation, coordUpdate, updateTime }) {

  const [location, setLocation] = useState('');
  const [time, setTime] = useState('')

  function handleLocationSubmit (e) {
    e.preventDefault();
    updateLocation(location)
    setLocation('');
  }

  function handleTimeSubmit (e) {
    e.preventDefault()
    updateTime(time)
  }

  return (
    <div className="container">
      <div className="gps">
        <button className="coord" onClick={coordUpdate}>GPS</button>
      </div>
      <div className="location">
        <div className="forms">
          <form onSubmit={handleLocationSubmit} className="form">
            <input type="text" name="city" placeholder="City.." value={location} onChange={(e) => setLocation(e.target.value)} />
            <button className="city_input" type="submit">x</button>
          </form>
          <form onSubmit={handleTimeSubmit} className="form">
            <input type="datetime-local" name="time" placeholder="2017-06-13T13:00" value={time} onChange={(e) => setTime(e.target.value)} />
            <button className="time_input" type="submit">x</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LocationInput  