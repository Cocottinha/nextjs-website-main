import PlotComponent from "@/components/charts/chart";
import { readTextFile } from "@/components/charts/getData";
import styles from './grafico.module.css';
import { getPost } from "@/lib/data";
import ParamsXRF from "@/components/paramsXRF/paramsXRF";
import ParamsFTIR from "@/components/paramsFTIR/paramsFTIR";
import Image from "next/image";

const Grafico = async ( { params } ) => {
  const tecnica = params.tecnica.split('-');
  console.log(tecnica[1])
  if (tecnica[1].startsWith("XRF")) {
    const post = await getPost(tecnica[0]);
    const { Pontos } = JSON.parse(JSON.stringify(post));
    var objetoAnalise;
    Pontos.forEach(ponto => {
      ponto.AnaliseTecnica.forEach(analise => {
        if (analise.nomeDaTecnica == tecnica[1])
        {
          objetoAnalise = analise
          return
        }
      })
    });

    if (objetoAnalise != null) {
      const file = objetoAnalise.diretorio
      const { arrayA, arrayB } = await readTextFile(file);
      return (
        <div className={styles.container}>
          <h1>{objetoAnalise.nomeDaTecnica}</h1>
          <PlotComponent x={arrayA} y={arrayB}/>
          <ParamsXRF objeto={objetoAnalise}/>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <h1>Gráfico não encontrado</h1>
      </div>
    )
  } else if (tecnica[1].startsWith("FTIR")) {
    const post = await getPost(tecnica[0]);
    const { Pontos } = JSON.parse(JSON.stringify(post));
    var objetoAnalise;
    Pontos.forEach(ponto => {
      ponto.AnaliseTecnica.forEach(analise => {
        if (analise.nomeDaTecnica == tecnica[1])
        {
          objetoAnalise = analise
          return
        }
      })
    });
    if (objetoAnalise != null) {
      const file = objetoAnalise.diretorio
      const { arrayA, arrayB } = await readTextFile(file);
      return (
        <div className={styles.container}>
          <h1>{objetoAnalise.nomeDaTecnica}</h1>
          <PlotComponent x={arrayA} y={arrayB}/>
          <ParamsFTIR objeto={objetoAnalise}/>
        </div>
      );
    }
    return(
      <div className={styles.container}>
        <h1>Gráfico não encontrado</h1>
      </div>
    )
  }else if (tecnica[1].startsWith("MO")) {
    const post = await getPost(tecnica[0]);
    const { Pontos } = JSON.parse(JSON.stringify(post));
    var objetoAnalise;
    Pontos.forEach(ponto => {
      ponto.AnaliseTecnica.forEach(analise => {
        if (analise.nomeDaTecnica == tecnica[1])
        {
          objetoAnalise = analise
          return
        }
      })
    });
    if (objetoAnalise != null) {
      const file = objetoAnalise.diretorio
      return (
        <div className={styles.container}>
          <h1>{objetoAnalise.nomeDaTecnica}</h1>
          <Image src={file}/>
          
        </div>
      );
    }
    return(
      <div className={styles.container}>
        <h1>Gráfico não encontrado</h1>
      </div>
    )
  }
}


export default Grafico