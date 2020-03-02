import React, { useState, useEffect } from 'react';
import ApiClient from './Services/ApiClient';
import WeatherNow from './Components/WeatherNow/index'
import LocationInput from './Components/LocationInput/index'
import CO2Chart from './Components/CO2Chart/index'
import MLModel from './Components/Prediction/index'
import HistoricalData from './Components/WeatherHistory';
import moment from 'moment';
import './App.css';
const fs = require('fs');

function App () {

  const [weatherNow, setWeatherNow] = useState({});
  const [weatherHistorical, setWeatherHistorical] = useState({});
  const [coords, setCoords] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [MLData, setMLData] = useState([])

  let date = moment(Date.now()).format('MM-DD')
  let hour = moment(Date.now()).format('HH')
  let dateRegExp = new RegExp(`.*-${date} ${hour}:0+:0+$`);
  let MLDataRegExp = new RegExp(`.*-${date}`)

  function updateDataByCoords () {
    ApiClient.getWeatherNowByCoords(coords.latitude, coords.longitude)
      .then(data => setWeatherNow(data))
    ApiClient.getStationIdByCoords(coords.latitude, coords.longitude)
      .then(id => updateData(id))
  }

  function updateData (id) {
    let i = 0;
    if (id) {
      ApiClient.getWeatherHistoryByStationId(id.data.length > 0 && id.data[i].id, Date.now())
        .then(data => {
          if (data) {
            if (data.data.length === 0) {
              i++;
              ApiClient.getWeatherHistoryByStationId(id.data.length > 0 && id.data[i].id, Date.now())
                .then(data => populateData(dateRegExp, data, MLDataRegExp))
            } else {
              populateData(dateRegExp, data, MLDataRegExp)
            }
          }
        })
    }
  }

  function updateDataOnInput (location) {
    ApiClient.getWeatherNow(location)
      .then(data => setWeatherNow(data));
    ApiClient.getWeatherStationId(location)
      .then(id => updateData(id))
  }

  function updateTime (newTime) {
    let d = moment(newTime).format('MM-DD HH')
    let e = moment(newTime).format('MM-DD')
    let updatedDateRegExp = new RegExp(`.*-${d}:0+:0+$`)
    let updatedMLDataDateRegExp = new RegExp(`.*-${e}`)
    populateData(updatedDateRegExp, weatherHistorical, updatedMLDataDateRegExp)
  }

  function populateData (dateRegExp, weatherHistorical, MLDataRegExp) {
    setWeatherHistorical(weatherHistorical)
    const tempData = [];
    const modelData = [];
    if (weatherHistorical) {
      for (let i = 0; i < weatherHistorical.data.length; i++) {
        if (MLDataRegExp.test(weatherHistorical.data[i].time)) {
          modelData.push({
            x: new Date(weatherHistorical.data[i].time),
            y: weatherHistorical.data[i].temperature
          })
        }
        if (dateRegExp.test(weatherHistorical.data[i].time)) {
          tempData.push({
            x: new Date(weatherHistorical.data[i].time),
            y: weatherHistorical.data[i].temperature
          })
        }
      }
      setFilteredData(tempData)
      setMLData(modelData)
      // fs.writeFile('./MLData.json', modelData, () => {
      //   console.log('modelData overwritten');
      // })
    }
  }

  function geoSuccess (position) {
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    setCoords(coords)
  }

  function geoError () {
    alert("Geocoder failed.");
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
    if (coords.latitude) {
      updateDataByCoords()
    }
    // eslint-disable-next-line
  }, [coords.latitude])

  return (
    <div className="App">
      <div className="current">
        <WeatherNow weatherNow={weatherNow} />
      </div>
      <div className="feat">
        <p>Prediction</p>
        <MLModel />
      </div>
      <div className="Co2">
        <CO2Chart />
      </div>
      <div className="historical">
        <HistoricalData filteredData={filteredData} />
      </div>
      <div className="location">
        <LocationInput updateLocation={updateDataOnInput} coordUpdate={updateDataByCoords} updateTime={updateTime} />
      </div>
    </div>
  );


}

export default App;
