import PlotComponent from "@/components/charts/chart";
import { readTextFileFTIR } from "@/components/charts/getDataFTIR";
import styles from './grafico.module.css';
import { getPost } from "@/lib/data";
import ParamsXRF from "@/components/params/paramsXRF";
import ParamsFTIR from "@/components/params/paramsFTIR";
import Image from "next/image";
import ParamsMO from "@/components/params/paramsMO";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { readTextFileXRF } from "@/components/charts/getDataXRF";

const Grafico = async ({params}) => {
  const tecnica = params.tecnica.split('-');

  //XRF-------------------------------------------------------------
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
      if(file.length === 0){
        <div className={styles.container}>
          <h1>Gráfico não encontrado</h1>
        </div>
      }
      else{
        const { arrayA, arrayB } = await readTextFileXRF(file);
        return (
          <div className={styles.container}>
            <h1>{objetoAnalise.nomeDaTecnica}</h1>
            <Suspense fallback={<Loading />}>
              <PlotComponent x={arrayA} y={arrayB} />
            </Suspense>
            <ParamsXRF objeto={objetoAnalise} />
          </div>
        );
      }
      
    }
    return (
      <div className={styles.container}>
        <h1>Gráfico não encontrado</h1>
      </div>
    )

  //FTIR-------------------------------------------------------------
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
      const { arrayA, arrayB } = await readTextFileFTIR(file);
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

  //MO-------------------------------------------------------------
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
      let file;
      objetoAnalise.imagensEObjetivas.map(i => {
        file = i.diretorio
      })
      return (
        <div className={styles.container}>
          <h1>{objetoAnalise.nomeDaTecnica}</h1>
          <Image src={file} fill/>
          <ParamsMO objeto={objetoAnalise}/>
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