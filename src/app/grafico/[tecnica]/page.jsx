import PlotComponent from "@/components/charts/chart";
import { readTextFileFTIR } from "@/components/charts/getDataFTIR";
import styles from './grafico.module.css';
import { getPost } from "@/lib/action";
import ParamsXRF from "@/components/params/paramsXRF";
import ParamsFTIR from "@/components/params/paramsFTIR";
import Image from "next/image";
import ParamsMO from "@/components/params/paramsMO";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { readTextFileXRF } from "@/components/charts/getDataXRF";

const Grafico = async ({ params }) => {
  const tecnica = params.tecnica.split('-');
  console.log(tecnica)
  const post = await getPost(tecnica[0]);
  //XRF-------------------------------------------------------------
  if (tecnica[1].startsWith("XRF")) {    
    const Pontos  = post.pontos;
    var objetoAnalise;
    Pontos.map((ponto) => {
      ponto.tecnicas.map((analise) => {
        if (analise.nome_tecnica == tecnica[1]) {
          objetoAnalise = analise
          return
        }
      })
    });
    if (objetoAnalise != null) {
      const file = `public/ftp/${post.projeto_id}/${objetoAnalise.diretorio}`;
      if (file.length === 0) {
        <div className={styles.container}>
          <h1>Gráfico não encontrado</h1>
        </div>
      }
      else {
        const { arrayA, arrayB } = await readTextFileXRF(file);
        return (
          <div className={styles.container}>
            <h1>{objetoAnalise.nome_tecnica}</h1>
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
    const Pontos = post.pontos;
    var objetoAnalise;
    Pontos.map((ponto) => {
      ponto.tecnicas.map((analise) => {
        if (analise.nome_tecnica == tecnica[1]) {
          objetoAnalise = analise
          return
        }
      })
    });
    if (objetoAnalise != null) {
      const file = `public/ftp/${post.projeto_id}/${objetoAnalise.diretorio}`;
      console.log(file)
      const { arrayA, arrayB } = await readTextFileFTIR(file);
      return (
        <div className={styles.container}>
          <h1>{objetoAnalise.nome_tecnica}</h1>
          <Suspense fallback={<Loading />}>
              <PlotComponent x={arrayA} y={arrayB} />
            </Suspense>
          <ParamsFTIR objeto={objetoAnalise} />
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <h1>Gráfico não encontrado</h1>
      </div>
    )

    //MO-------------------------------------------------------------
  } else if (tecnica[1].startsWith("MO")) {
    const Pontos  = post.pontos;
    var objetoAnalise;
    Pontos.map((ponto) => {
        ponto.tecnicas.map((analise) => {
          if (analise.nome_tecnica == tecnica[1]) {
            objetoAnalise = analise
            return
          }
        })
      }    
    );
    if (objetoAnalise != null) {
      let file;
      objetoAnalise.imagensEAumentos.map(i => {
         file = `/ftp/${post.projeto_id}/${i.diretorio}`;
      })
      console.log("MO",file)
      return (
        <div className={styles.container}>
          <h1>{objetoAnalise.nome_tecnica}</h1>
          <div className={styles.twoPanels}>
            <div className={styles.contImg}>
              <Image className={styles.img} src={file} fill />
            </div>
            <ParamsMO objeto={objetoAnalise} />
          </div>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <h1>Gráfico não encontrado</h1>
      </div>
    )
  }
}


export default Grafico