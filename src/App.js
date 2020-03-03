import React, { useState, useEffect } from 'react';
import ApiClient from './Services/ApiClient';
import WeatherNow from './Components/WeatherNow/index'
import LocationInput from './Components/LocationInput/index'
import CO2Chart from './Components/CO2Chart/index'
<<<<<<< HEAD
import Spinner from './Components/Spinner/index'
// import MLModel from './Components/Prediction/index'
=======
import MLModel from './Components/Prediction/index'
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f
import HistoricalData from './Components/WeatherHistory';
import moment from 'moment';
import './App.css';
const fs = require('fs');

function App () {

  const [status, setStatus] = useState(true);
  const [weatherNow, setWeatherNow] = useState({});
  const [weatherHistorical, setWeatherHistorical] = useState({});
  const [coords, setCoords] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [MLData, setMLData] = useState([])

  let date = moment(Date.now()).format('MM-DD')
  let hour = moment(Date.now()).format('HH')
  let dateRegExp = new RegExp(`.*-${date} ${hour}:0+:0+$`);

  function updateDataByCoords () {
    setStatus(true);
    ApiClient.getWeatherNowByCoords(coords.latitude, coords.longitude)
      .then(data => setWeatherNow(data))
    ApiClient.getStationIdByCoords(coords.latitude, coords.longitude)
      .then(id => updateData(id))
  }

  function updateData (id) {
    setStatus(true)
    let i = 0;
    if (id) {
      ApiClient.getWeatherHistoryByStationId(id.data.length > 0 && id.data[i].id, Date.now())
        .then(data => {
          if (data) {
            if (data.data.length === 0) {
              i++;
              ApiClient.getWeatherHistoryByStationId(id.data.length > 0 && id.data[i].id, Date.now())
<<<<<<< HEAD
                .then(data => populateData(dateRegExp, data))
            } else {
              populateData(dateRegExp, data)
            }
          }
        })
        .then(() => setStatus(false));
=======
                .then(data => populateData(dateRegExp, data, MLDataRegExp))
            } else {
              populateData(dateRegExp, data, MLDataRegExp)
            }
          }
        })
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f
    }
  }

  function updateDataOnInput (location) {
    setStatus(true);
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
<<<<<<< HEAD
    if (weatherHistorical) {
      for (let i = 0; i < weatherHistorical.data.length; i++) {
=======
    const modelData = [];
    if (weatherHistorical) {
      for (let i = 0; i < weatherHistorical.data.length; i++) {
        if (MLDataRegExp.test(weatherHistorical.data[i].time)) {
          modelData.push({
            x: new Date(weatherHistorical.data[i].time),
            y: weatherHistorical.data[i].temperature
          })
        }
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f
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

  function computeSMA (data, window_size) {
    let tempArr = []
    for (let i = 0; i < data.length; i++) {
      tempArr.push(data[i].y);
    }
    let r_avgs = [], avg_prev = 0;
    for (let i = 0; i <= tempArr.length - window_size; i++) {
      let curr_avg = 0, t = i + window_size;
      for (let k = i; k < t && k <= tempArr.length; k++) {
        curr_avg += tempArr[k] / window_size;
      }
      let date = (data[i].x).getTime() + (3.154e+10 * (2))
      date = new Date(date)
      r_avgs.push({ x: date, y: curr_avg });
      avg_prev = curr_avg;
    }
    if (data[0] && data[1]) {
      r_avgs.unshift({ x: (data[0].x), y: (data[0].y + data[1].y) / 2 })
      r_avgs.push({ x: data[data.length - 1].x, y: avg_prev })
    }
    return r_avgs;
  };

  let SMA = computeSMA(filteredData, 3);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
    if (coords.latitude) {
      updateDataByCoords()
    }
    // eslint-disable-next-line
  }, [coords.latitude])

  return (
    <div className="App">
      <div className="location">
        <LocationInput updateLocation={updateDataOnInput} coordUpdate={updateDataByCoords} updateTime={updateTime} />
      </div>
      <div className="current">
        <WeatherNow weatherNow={weatherNow} />
      </div>
      {/* TODO: fix tensorflow model to work on browser
      <div className="feat">
        <p>Prediction</p>
<<<<<<< HEAD
        <MLModel MLData={filteredData} />
      </div> */}
      <div className="Co2">
        <span className="dT"> dT: {SMA.length ? (SMA[SMA.length - 1].y - SMA[0].y).toFixed(2) : '~'} °C </span>
        <CO2Chart />
=======
        <MLModel />
      </div>
      <div className="Co2">
        <CO2Chart />
      </div>
      <div className="historical">
        <HistoricalData filteredData={filteredData} />
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f
      </div>
      <div className="historical">
        {!status
          ?
          <HistoricalData filteredData={filteredData} SMA={SMA} />
          : <div className="loader">
            <Spinner className="spinner" />
          </div>}
      </div>
    </div >
  );
}

export default App;
