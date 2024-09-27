"use client"
import Image from 'next/image';
import styles from "./imagePlot.module.css"
import ParamsMO from "@/components/params/paramsMO";

const ImagePlot = ({ params, post, tecnica }) => {
  if (tecnica[1].startsWith("MO")) {
    
    const Pontos = post.pontos;
    let objetoAnalise = null;

    Pontos.forEach((ponto) => {
      ponto.tecnicas.forEach((analise) => {
        if (analise.nome_tecnica === tecnica[1]) {
          objetoAnalise = analise;
        }
      });
    });

    if (objetoAnalise) {
      const imagens = objetoAnalise.imagensEAumentos.map((i, index) => (
        <div key={index} className={styles.contImg}>
          <h4>Aumento: {i.aumento}</h4>         
          <Image
            className={styles.img}
            src={`/ftp/${post.projeto_id}/${i.diretorio}`}
            fill
            alt={`Imagem_${index}`}
            priority
          />
          
        </div>
        
      ));
      return (
        <div className={styles.container}>
          <h1>{objetoAnalise.nome_tecnica}</h1>
          <div className={styles.twoPanels}>
            <ParamsMO objeto={objetoAnalise} />
              {imagens}
          </div>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <h1>Imagem não encontrada</h1>
      </div>
    );
  }

  return null;
}

export default ImagePlot;