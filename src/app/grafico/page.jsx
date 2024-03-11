import PlotComponent from "@/components/charts/chart"
import { readTextFile } from "@/components/charts/getData";

const Grafico = async () => {
  const { arrayA, arrayB } = await readTextFile('public/00105-Spectrometer Mode.txt');

  return (
    <div className={styles.container}>
      <h1>Next.js with Plotly.js</h1>
      <PlotComponent x={arrayA} y={arrayB}/>
    </div>
  );
}

// export function getServerSideProps(context) {
//   const { diretorio } = context.query
//   console.log(diretorio)
// }

export default Grafico