import React, { useState } from 'react';
import './style.css';


function LocationInput ({ updateLocation, coordUpdate, updateTime }) {

  const [location, setLocation] = useState('');
  const [time, setTime] = useState('00:00')

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
    <div className="location">
      <form onSubmit={handleLocationSubmit} className="form">
        City
      <input type="text" name="city" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button className="city_input" type="submit">update</button>
      </form>
      <button className="coord" onClick={coordUpdate}>get GPS</button>
      <form onSubmit={handleTimeSubmit} className="form">
        Time
      <input type="datetime-local" name="time" placeholder="2017-06-13T13:00" value={time} onChange={(e) => setTime(e.target.value)} />
        <button className="city_input" type="submit">update</button>
      </form>
    </div>
  )
}

export default LocationInput  