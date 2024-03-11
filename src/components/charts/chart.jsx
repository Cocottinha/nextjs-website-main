"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from "./chart.module.css"

const DynamicPlot = dynamic(() => import('react-plotly.js'), { ssr: false });

const PlotComponent = ({ x,y }) => {
  const [plotLoaded, setPlotLoaded] = useState(false);
  
  useEffect(() => {
     setPlotLoaded(true);
  }, []);

  if (!plotLoaded) return <div>Loading Plot...</div>;

  const xValues = x;
  const yValues = y;

  return (
    <div className={styles.container}>
      <DynamicPlot
        data={[
          {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines+points',
            marker: { color: 'blue' },
          },
        ]}
        className={styles.plot} layout={{title:"",autosize:true}} useResizeHandler={true}
      />
    </div>
  );
};

export default PlotComponent;
