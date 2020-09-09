import React, { useState } from 'react';
import 'react-vis/dist/style.css';
import { FlexibleXYPlot, LineSeries, MarkSeries, AreaSeries, XAxis, YAxis, Crosshair } from 'react-vis';
import moment from 'moment'

function MLModel ({ filteredData, SMA }) {

  const [points, setPoints] = useState([]);

  const yMax = Math.max(...filteredData.map(p => p.y)) + 1;
  const yMin = Math.min(...filteredData.map(p => p.y)) - 2; // < 0 ? Math.min(...filteredData.map(p => p.y)) - 2 : 0;

  return (
    <FlexibleXYPlot className="graph"
      yDomain={[yMin, yMax]}
      xType="time"
      margin={25}
      onMouseLeave={() => setPoints([])}>
      <AreaSeries
        animation={"gentle"}
        data={filteredData}
        curve={'curveNatural'}
        color="#1f5d2f"
      />
      <AreaSeries
        animation={"gentle"}
        curve={'curveNatural'}
        color=" #173042"
        data={SMA}
      />
      <MarkSeries
        data={filteredData}
        animation={"gentle"}
        size="2"
        color="#0a8a00"
      />
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
      <YAxis tickSize={0} position={'start'} hideLine title="Temp (°C)" />
      <Crosshair values={points} style={{
        line: { backgroundColor: "green" }
      }}>
        <div style={{ background: 'black' }}>
          <p>{points.length && JSON.stringify(moment(points[0].x).format('l HH:mm'))}</p>
          <p>{points.length && JSON.stringify(points[0].y)} °C</p>
        </div>
      </Crosshair>
    </FlexibleXYPlot>
  )
}

export default MLModel;