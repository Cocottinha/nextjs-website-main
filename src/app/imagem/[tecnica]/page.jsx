import styles from "./imagem.module.css";
import Image from 'next/image';
import { getPost } from "@/lib/action";
import ParamsMO from "@/components/params/paramsMO";
import { Suspense } from "react";
import Loading from "@/app/loading";
import ImagePlot from "@/components/image/image";

const Imagem = async ({ params }) => {
  const tecnica = params.tecnica.split('-');
  const post = await getPost(tecnica[0]);

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
            alt={`Imagem ${index}`}
          />
        </div>
      ));

      return (
        <div className={styles.container}>
          <h1>{objetoAnalise.nome_tecnica}</h1>
          <div className={styles.twoPanels}>
            <ParamsMO objeto={objetoAnalise} />
            <Suspense fallback={<Loading/>}>
                <ImagePlot params={objetoAnalise}/>
              </Suspense>
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
};

export default Imagem;
