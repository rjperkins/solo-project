import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { FlexibleXYPlot, LineSeries, MarkSeries, AreaSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis } from 'react-vis';

function HistoricalData ({ filteredData, width }) {
  const yMax = Math.max(...filteredData.map(p => p.y)) + 5;
  const yMin = Math.min(...filteredData.map(p => p.y)) - 5;

  function ComputeSMA (data, window_size) {
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
    if (data[0]) {
      r_avgs.unshift({ x: (data[0].x), y: (data[0].y + data[1].y) / 2 })
      r_avgs.push({ x: data[data.length - 1].x, y: avg_prev })

    }
    return r_avgs;
  }

  let SMA = ComputeSMA(filteredData, 3)

  return (
    <FlexibleXYPlot
      yDomain={[yMin, yMax]}
      xType="time">
      <AreaSeries
        data={filteredData}
        curve={'curveNatural'}
        color="rgba(9, 138, 0, 0.3)"
      />
      <AreaSeries
        curve={'curveNatural'}
        color="white"
        data={SMA}
      />
      <MarkSeries data={filteredData}
        size="2"
        color="#0a8a00" />
      {/* <HorizontalGridLines />
      <VerticalGridLines /> */}

      <LineSeries
        curve={'curveNatural'}
        color="#929292"
        style={{ strokeDasharray: "2 2" }}
        strokeStyle="dashed"
        data={SMA} />
      <LineSeries
        curve={'curveNatural'}
        color="#0a8a00"
        data={filteredData} />
      <XAxis tickSize={0} hideLine tickLabelAngle={-20} title="Date" />
      <YAxis tickSize={0} position={'start'} hideLine title="Temp (°C)" />
    </FlexibleXYPlot>
  )
}

export default HistoricalData;