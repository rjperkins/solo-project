import React from 'react';
import { FlexibleXYPlot, LineSeries, MarkSeries, AreaSeries, XAxis, YAxis } from 'react-vis';
const tf = require('@tensorflow/tfjs')

function MLModel ({ MLData }) {

  let MLDataArr = []
  let prediction = [];
  let chartData = [];

  const time = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  let Co2Arr20102020 = [371.7, 373.22, 375.52, 378.28, 379.69, 382.21, 384.05, 386.1, 387.76, 389.48];
  let Co2Arr20202030 = [392.15, 393.74, 395.71, 398.61, 401.25, 402.8, 406.83, 408.88, 410.79, 413.92];

  function normaliser (array) {
    var ratio = Math.max(...array) / 100;
    array = array.map(v => (v / ratio) / 100);
    return array
  }

  for (const key in MLData) {
    if (MLData.hasOwnProperty(key)) {
      MLDataArr.push(MLData[key].y);
    }
  }

  async function modelTrainer (input, knownOutput, toPredict) {

    let trainingData = normaliser(input).slice(0, MLData.length);
    let validationData = normaliser(knownOutput).slice(0, MLData.length);

    const model = tf.sequential()
    model.add(tf.layers.dense({ units: 8, inputShape: [1] }));
    model.add(tf.layers.leakyReLU({ units: 8, inputShape: [8] }));
    model.add(tf.layers.dense({ units: 8, inputShape: [8] }));
    model.add(tf.layers.dense({ units: 8, inputShape: [64] }));
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    const learningRate = 0.0001;
    const optimizer = tf.train.sgd(learningRate);

    model.compile({
      optimizer: optimizer,
      loss: 'meanSquaredError'
    });

    await model.fit(tf.tensor(normaliser(trainingData)), tf.tensor(normaliser(validationData)), { epochs: 1000 }).then(() => {
      let weather = model.predict(tf.tensor(normaliser(toPredict))).dataSync();
      if (weather) {
        weather.map(x => Math.max(MLData) * x)
        for (let i = 0; i < prediction.length; i++) {
          chartData.push({ x: time[i], y: prediction[i] })
        }
      }
    })
  }

  if (MLData.length) {
    modelTrainer(Co2Arr20102020, MLData, Co2Arr20202030)
  }

  return (
    <FlexibleXYPlot
      xType="time"
      margin={25}>
      <AreaSeries
        data={chartData}
        curve={'curveNatural'}
        color="rgba(0, 200, 60, 0.551)"
      />
      <AreaSeries
        curve={'curveNatural'}
        color="rgba(0, 0, 0, 1)"
        data={chartData}
      />
      <MarkSeries data={chartData}
        size="2"
        color="#0a8a00" />
      <LineSeries
        curve={'curveNatural'}
        color="#929292"
        style={{ strokeDasharray: "2 2" }}
        strokeStyle="dashed"
        data={chartData} />
      <LineSeries
        curve={'curveNatural'}
        color="#0a8a00"
        data={chartData} />
      <XAxis tickSize={0} hideLine tickLabelAngle={-20} title="Date" />
      <YAxis tickSize={0} position={'end'} hideLine title="Temp (°C)" />
    </FlexibleXYPlot>
  )

}

export default MLModel;