const Co2 = require('../../C02.json');
const tf = require('@tensorflow/tfjs-node')
const fs = require('fs');

let Co2Arr = [];

let emissionsGTon = [16.83, 17.26, 18.23, 19.05, 19.55, 20.08, 20.14, 20.7, 21.24, 21.77, 22.61, 23.42, 24.22, 25.09, 25.7, 26.36, 27.49, 28.75, 28.5, 29.53, 30.47, 30.34, 30.51, 31.92, 32.77, 33.49, 34.27, 34.09, 33.4, 34.66, 34.83, 35.33, 36.2, 36.8, 38.1, 38.71, 39.32, 39.34, 40.15, 39.73, 39.3, 39.62, 39.97, 40.59, 41.55, 40.58, 40.59, 40.95, 41.2, 42.46, 43.92, 45.85, 46.75, 47.27, 48.26, 48.43, 48.42, 50, 51.39, 52.5, 53.47];
let Co2ppm = [318.15, 319.59, 319.77, 320.55, 321.47, 321.89, 321.87, 323.75, 324.09, 325.36, 326.76, 327.66, 328.57, 329.09, 332.07, 332.16, 333.45, 334, 336.17, 338.01, 339.26, 341.33, 342.54, 343.79, 345.63, 346.98, 348.38, 349.93, 351.53, 353.72, 355.37, 356.34, 358.13, 359.33, 359.52, 360.81, 363.19, 364.92, 365.59, 368.99, 370.3, 371.7, 373.22, 375.52, 378.28, 379.69, 382.21, 384.05, 386.1, 387.76, 389.48, 392.15, 393.74, 395.71, 398.61, 401.25, 402.8, 406.83, 408.88, 410.79, 413.92]


for (const key in Co2) {
  if (Co2.hasOwnProperty(key) && Co2[key].year >= 1958 && Co2[key].month === 6) {
    Co2Arr.push(Co2[key].average);
  }
}

let weather;

//TODO: move data to json file
const MLData = [
  8.2,
  8.4,
  8.3,
  8.1,
  7.8,
  7.7,
  7.3,
  7.1,
  8.8,
  11.6,
  14.9,
  14.3,
  15,
  14.5,
  14.3,
  14.1,
  13.6,
  12.8,
  12.1,
  11.7,
  11.3,
  10.4,
  10.5,
  9.5,
  8.7,
  8,
  8.2,
  8.4,
  9.2,
  8.2,
  8.4,
  9.4,
  11.2,
  12.5,
  14.4,
  15.5,
  16.9,
  17.9,
  18.7,
  18.2,
  19.2,
  16.4,
  14.9,
  13.4,
  13.4,
  12.5,
  11.9,
  11.2,
  12.4,
  12,
  12,
  11,
  11,
  12,
  12.6,
  13,
  14,
  14,
  16,
  16.7,
  17.1,
  17.3,
  17,
  16.8,
  16.4,
  16,
  15.5,
  15.2,
  14.9,
  14.6,
  14.3,
  14
]

const MLData2 = [
  8.2,
  8.4,
  8.3,
  8.1,
  7.8,
  7.7,
  7.3,
  7.1,
  8.8,
  11.6,
  14.9,
  14.3,
  15,
  14.5,
  14.3,
  14.1,
  13.6,
  12.8,
  12.1,
  11.7,
  11.3,
  10.4,
  10.5,
  9.5,
  8.7,
  8,
  8.2,
  8.4,
  9.2,
  8.2,
  8.4,
  9.4,
  11.2,
  12.5,
  14.4,
  15.5,
  16.9,
  17.9,
  18.7,
  18.2,
  19.2,
  16.4,
  14.9,
  13.4,
  13.4,
  12.5,
  11.9,
  11.2,
  12.4,
  12,
  12,
  11,
  11,
  12,
  12.6,
  13,
  14,
  14,
  16,
  16,
  16.6,
  16,
  15,
  15,
  15,
  15.8,
  15.4,
  15,
  14.8,
  14.7,
  14.4,
  14.1
]

function normaliser (array) {
  var ratio = Math.max(...array) / 100;
  array = array.map(v => (v / ratio) / 100);
  return array
}

async function modelTrainer (input, knownOutput, toPredict) {

  let trainingData = normaliser(input).slice(0, input.length);
  let validationData = normaliser(knownOutput).slice(0, input.length);

  const model = tf.sequential()
  model.add(tf.layers.dense({ units: 128, inputShape: [1] }));
  model.add(tf.layers.leakyReLU({ units: 128, inputShape: [128] }));
  model.add(tf.layers.dense({ units: 128, inputShape: [128] }));
  model.add(tf.layers.dense({ units: 128, inputShape: [128] }));
  model.add(tf.layers.dense({ units: 1, inputShape: [128] }));

  model.compile({
    optimizer: 'adamax',
    loss: 'meanSquaredError'
  });

  await model.fit(tf.tensor(trainingData), tf.tensor(validationData), { epochs: 2 }).then(() => {
    weather = model.predict(tf.tensor(normaliser(toPredict))).dataSync()
    let temp = weather.map(x => x * Math.max(...MLData2))
    fs.writeFile('prediction.json', JSON.stringify(temp), () => {
      console.log('created');
    })

  })

}

modelTrainer(Co2Arr, MLData, MLData2)

module.exports = modelTrainer
