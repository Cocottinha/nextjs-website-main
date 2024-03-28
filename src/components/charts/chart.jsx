"use client"
import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from "./chart.module.css"
import Loading from '@/app/loading';

const DynamicPlot = dynamic(() => import('react-plotly.js'), { ssr: false });

const PlotComponent = ({ x,y }) => {
  const [plotLoaded, setPlotLoaded] = useState(false);
  
  useEffect(() => {
     setPlotLoaded(true);
  }, []);

  const xValues = x;
  const yValues = y;

  return (
    <div className={styles.container}>
      <Suspense fallback={<Loading/>}>
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
      </Suspense>
    </div>
  );
};

export default PlotComponent;
