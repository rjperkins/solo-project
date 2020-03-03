import React, { useState } from 'react';
import './style.css';

function LocationInput ({ updateLocation, coordUpdate, updateTime }) {

  const [location, setLocation] = useState('');
<<<<<<< HEAD
  const [time, setTime] = useState('');
=======
  const [time, setTime] = useState('')
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f

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
<<<<<<< HEAD
        <button className="coord" onClick={coordUpdate}><img className="gps-image" src={require('../../icons/110094_miscellaneous_512x512.png')} alt="gps"></img></button>
=======
        <button className="coord" onClick={coordUpdate}>GPS</button>
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f
      </div>
      <div className="location">
        <div className="forms">
          <form onSubmit={handleLocationSubmit} className="form">
<<<<<<< HEAD
            <input type="text" name="city" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <button className="city-input" type="submit"><img className="update" src={require('../../icons/icons_update-512.png')} alt="update" /></button>
          </form>
          <form onSubmit={handleTimeSubmit} className="form">
            <input type="datetime-local" name="time" placeholder="13-06-2020 12:00" value={time} onChange={(e) => setTime(e.target.value)} required />
            <button className="time-input" type="submit"><img className="update" src={require('../../icons/icons_update-512.png')} alt="update" /></button>
=======
            <input type="text" name="city" placeholder="City.." value={location} onChange={(e) => setLocation(e.target.value)} />
            <button className="city_input" type="submit">x</button>
          </form>
          <form onSubmit={handleTimeSubmit} className="form">
            <input type="datetime-local" name="time" placeholder="2017-06-13T13:00" value={time} onChange={(e) => setTime(e.target.value)} />
            <button className="time_input" type="submit">x</button>
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f
          </form>
        </div>
      </div>
    </div>
  )
}

export default LocationInput  