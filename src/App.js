import React, { useState, useEffect } from 'react';
import ApiClient from './Services/ApiClient';
import WeatherNow from './Components/WeatherNow/index'
import LocationInput from './Components/LocationInput/index'
import CO2Chart from './Components/CO2Chart/index'
import Spinner from './Components/Spinner/index'
// import MLModel from './Components/Prediction/index'
import HistoricalData from './Components/WeatherHistory';
import moment from 'moment';
import './App.css';

function App () {

  const [status, setStatus] = useState(true);
  const [weatherNow, setWeatherNow] = useState({});
  const [weatherHistorical, setWeatherHistorical] = useState({});
  const [coords, setCoords] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  // const [MLData, setMLData] = useState([])

  let date = moment(Date.now()).format('MM-DD')
  let hour = moment(Date.now()).format('HH')
  let dateRegExp = new RegExp(`.*-${date} ${hour}:0+:0+$`);

  function updateDataByCoords () {
    setStatus(true);
    ApiClient.getWeatherNowByCoords(41.385063, 2.173404)
      .then(data => setWeatherNow(data))
    ApiClient.getStationIdByCoords(41.385063, 2.173404)
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
                .then(data => populateData(dateRegExp, data))
            } else {
              populateData(dateRegExp, data)
            }
          }
        })
        .then(() => setStatus(false));
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
    let updatedDateRegExp = new RegExp(`.*-${d}:0+:0+$`)
    populateData(updatedDateRegExp, weatherHistorical)
  }

  function populateData (dateRegExp, weatherHistorical) {
    setWeatherHistorical(weatherHistorical)
    const tempData = [];
    if (weatherHistorical) {
      for (let i = 0; i < weatherHistorical.data.length; i++) {
        if (dateRegExp.test(weatherHistorical.data[i].time)) {
          tempData.push({
            x: new Date(weatherHistorical.data[i].time),
            y: weatherHistorical.data[i].temperature
          })
        }
      }
      setFilteredData(tempData)
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
        <MLModel MLData={filteredData} />
      </div> */}
      <div className="Co2">
        <span className="dT"> dT: {SMA.length ? (SMA[SMA.length - 1].y - SMA[0].y).toFixed(2) : '~'} °C </span>
        <CO2Chart />
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
