import React from 'react'
import CO2Data from '../../C02.json'
import '../../../node_modules/react-vis/dist/style.css';
import { FlexibleXYPlot, GradientDefs, AreaSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis } from 'react-vis';

function CO2Chart ({ height, width }) {


  const data = [];
  for (let i = 0; i < CO2Data.length; i++) {
    if (CO2Data[i].average > 0) {
      data.push({
        x: new Date(`${CO2Data[i].year}-${CO2Data[i].month}`),
        y: CO2Data[i].average
      })
    }
  }

  const yMax = Math.max(...data.map(p => p.y)) * 1.1;
  const yMin = Math.min(...data.map(p => p.y)) - 2;
  return (
    <FlexibleXYPlot yDomain={[yMin, yMax]} xType="time">

      {/* <HorizontalGridLines />
      <VerticalGridLines /> */}
      <GradientDefs>
        <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity={0.8} />
          <stop offset="100%" stopColor="green" stopOpacity={0.4} />
        </linearGradient>
      </GradientDefs>
      <XAxis title="Date" />
      <YAxis title="CO2 (ppm)" />
      <AreaSeries data={data} color="black" style={{ strokeWidth: '0.2px' }} curve="curveNatural" fill={'url(#CoolGradient)'} />
    </FlexibleXYPlot>
  )
}

export default CO2Chart;