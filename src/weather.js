const weatherData = require('./weather-london-hourly-2010-2020.json');

let middayTempArr = [];
let dateArr = [];
let dateRegExp = new RegExp('.*-12-.* 04:00:00$');

for (let i = 0; i < weatherData.data.length; i++) {
  if (dateRegExp.test(weatherData.data[i].time)) {
    middayTempArr.push(weatherData.data[i].temperature)
    dateArr.push(weatherData.data[i].time)
  }
}

function averagiser (list, date, prop) {
  let res = 0;
  let arr = [];
  let dateregexp = new RegExp(date + '$');
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    if (dateregexp.test(list[i].date)) {
      arr.push(list[i][prop])
      res = res + list[i][prop]
      count++;
    }

  }
  console.log(arr);
  return ((res / count))
}

const initialState = {
  minAvgTemp: 0,
  maxAvgTemp: 0,
  avgWindSpeed: 0,
  avgWindTemp: 0,
}

const minAvgTemp = averagiser(weatherData.list, '02-17', 'temperature_min')
const avgTemp = averagiser(weatherData.list, '02-17', 'temperature')
const maxAvgTemp = averagiser(weatherData.list, '02-17', 'temperature_max')
const avgWindSpeed = averagiser(weatherData.list, '02-17', 'windspeed')

const state = {
  'minAvgTemp': minAvgTemp,
  'avgTemp': avgTemp,
  'maxAvgTemp': maxAvgTemp,
  'avgWindSpeed': avgWindSpeed,
}

console.log(middayTempArr.length);

const arrSum = arr => arr.reduce((a, b) => a + b, 0)
console.log(arrSum(middayTempArr) / middayTempArr.length);



// let min = [4.3, 6.4, 6, -0.8, -2, -2, 2, 4, 5, 1]
// let avg = [5.8, 8.4, 6.8, 3.5, 3.3, 3, 7.5, 4.9, 8, 8.2]
// let max = [7, 10, 7.5, 9.9, 8, 9, 10, 6, 12, 13]
// let avgArr = [];
// for (let i = 0; i < min.length; i++) {
//   avgArr.push(min[i] + avg[i] + max[i]) / 3;
// }
// console.log(avgArr);

<div>
  Minimum average temperate {(state.minAvgTemp)}°C
      </div>
  <div>
    Average temperate {(state.avgTemp)}°C
      </div>
  <div>
    Maximum average temperate {(state.maxAvgTemp)}°C
      </div>
  <div>
    Average wind speed: {state.avgWindSpeed} km/h
      </div>