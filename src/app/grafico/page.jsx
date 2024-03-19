import PlotComponent from "@/components/charts/chart"
import { readTextFileFTIR } from "@/components/charts/getDataFTIR";

const Grafico = async () => {
  const { arrayA, arrayB } = await readTextFileFTIR('public/00105-Spectrometer Mode.txt');

  return (
    <div className={styles.container}>
      <h1>Next.js with Plotly.js</h1>
      <PlotComponent x={arrayA} y={arrayB}/>
    </div>
  );
}

export default Grafico