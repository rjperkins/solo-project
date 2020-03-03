<<<<<<< HEAD
import React, { useState } from 'react';
import 'react-vis/dist/style.css';
import { FlexibleXYPlot, LineSeries, MarkSeries, AreaSeries, XAxis, YAxis, Crosshair } from 'react-vis';
import moment from 'moment'
=======
import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { FlexibleXYPlot, LineSeries, MarkSeries, AreaSeries, XAxis, YAxis } from 'react-vis';
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f

function MLModel ({ filteredData, SMA }) {

<<<<<<< HEAD
  const [points, setPoints] = useState([]);
=======
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
    if (data[0] && data[1]) {
      r_avgs.unshift({ x: (data[0].x), y: (data[0].y + data[1].y) / 2 })
      r_avgs.push({ x: data[data.length - 1].x, y: avg_prev })
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f

  const yMax = Math.max(...filteredData.map(p => p.y)) + 1;
  const yMin = Math.min(...filteredData.map(p => p.y)) < 0 ? Math.min(...filteredData.map(p => p.y)) - 2 : 0;

  return (
    <FlexibleXYPlot className="graph"
      yDomain={[yMin, yMax]}
      xType="time"
<<<<<<< HEAD
      margin={25}
      onMouseLeave={() => setPoints([])}>
=======
      margin={25}>
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f
      <AreaSeries
        animation={"gentle"}
        data={filteredData}
        curve={'curveNatural'}
<<<<<<< HEAD
        color="#1f5d2f"
=======
        color="rgba(0, 200, 60, 0.551)"
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f
      />
      <AreaSeries
        animation={"gentle"}
        curve={'curveNatural'}
<<<<<<< HEAD
        color=" #173042"
=======
        color="rgba(0, 0, 0, 1)"
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f
        data={SMA}
      />
      <MarkSeries
        data={filteredData}
        animation={"gentle"}
        size="2"
<<<<<<< HEAD
        color="#0a8a00"
      />
=======
        color="#0a8a00" />
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f
      <LineSeries
        animation={"gentle"}
        curve={'curveNatural'}
        color="#929292"
        style={{ strokeDasharray: "2 2" }}
        strokeStyle="dashed"
        data={SMA} />
      <LineSeries
        onNearestX={v => setPoints([v])}
        curve={'curveNatural'}
        color="#0a8a00"
        animation={"gentle"}
        data={filteredData} />
      <XAxis tickSize={0} hideLine tickLabelAngle={-20} title="Date" />
<<<<<<< HEAD
      <YAxis tickSize={0} position={'start'} hideLine title="Temp (°C)" />
      <Crosshair values={points} style={{
        line: { backgroundColor: "green" }
      }}>
        <div style={{ background: 'black' }}>
          <p>{points.length && JSON.stringify(moment(points[0].x).format('l HH:mm'))}</p>
          <p>{points.length && JSON.stringify(points[0].y)} °C</p>
        </div>
      </Crosshair>
=======
      <YAxis tickSize={0} position={'end'} hideLine title="Temp (°C)" />
      {/* <Highlight
        drag
        enableX={false}
      // onBrush={area => setState({ filter: area })}
      // onDrag={area => setState({ filter: area })} 
      /> */}
>>>>>>> 6682b2484fa720f6be50d26f0711f875dcd6a13f
    </FlexibleXYPlot>
  )
}

export default MLModel;