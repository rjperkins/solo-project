// import React from 'react';
// import { FlexibleXYPlot, LineSeries, MarkSeries, AreaSeries, XAxis, YAxis } from 'react-vis';

// function MLModel ({ MLData }) {

// let MLDataArr = []
// let prediction = [];
// let chartData = [];

// const time = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
// let Co2Arr20102020 = [371.7, 373.22, 375.52, 378.28, 379.69, 382.21, 384.05, 386.1, 387.76, 389.48];
// let Co2Arr20202030 = [392.15, 393.74, 395.71, 398.61, 401.25, 402.8, 406.83, 408.88, 410.79, 413.92];

// function normaliser (array) {
//   var ratio = Math.max(...array) / 100;
//   array = array.map(v => (v / ratio) / 100);
//   return array
// }

// for (const key in MLData) {
//   if (MLData.hasOwnProperty(key)) {
//     MLDataArr.push(MLData[key].y);
//   }
// }
const tf = require('@tensorflow/tfjs-node')

function tensorflowjs () {

  const model = tf.sequential();

  model.add(tf.layers.dense({ units: 168, inputShape: [1] }));
  model.add(tf.layers.leakyReLU({ units: 168, inputShape: [168] }));
  model.add(tf.layers.dense({ units: 168, inputShape: [168] }));
  model.add(tf.layers.dense({ units: 168, inputShape: [168] }));
  model.add(tf.layers.dense({ units: 1, inputShape: [168] }));

  model.compile({
    loss: 'meanSquaredError',
    optimizer: 'adam'
  });

  model.fit(tf.tensor([1, 2, 3, 4, 5]), tf.tensor([3, 6, 9, 12, 15]), { epochs: 500 })
    .then(() => {
      const predicted = model.predict(tf.tensor([3, 5, 10, 6, 8, 1])).dataSync()
      console.log(predicted);
    })
}

tensorflowjs();

//   return (
//     <FlexibleXYPlot
//       xType="time"
//       margin={25}>
//       <AreaSeries
//         data={chartData}
//         curve={'curveNatural'}
//         color="rgba(0, 200, 60, 0.551)"
//       />
//       <AreaSeries
//         curve={'curveNatural'}
//         color="rgba(0, 0, 0, 1)"
//         data={chartData}
//       />
//       <MarkSeries data={chartData}
//         size="2"
//         color="#0a8a00" />
//       <LineSeries
//         curve={'curveNatural'}
//         color="#929292"
//         style={{ strokeDasharray: "2 2" }}
//         strokeStyle="dashed"
//         data={chartData} />
//       <LineSeries
//         curve={'curveNatural'}
//         color="#0a8a00"
//         data={chartData} />
//       <XAxis tickSize={0} hideLine tickLabelAngle={-20} title="Date" />
//       <YAxis tickSize={0} position={'end'} hideLine title="Temp (°C)" />
//     </FlexibleXYPlot>
//   )

// }

// export default MLModel;
