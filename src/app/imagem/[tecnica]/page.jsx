"use client"
import styles from "./imagem.module.css";
import Image from 'next/image'; // Certifique-se de importar o componente Image corretamente
import { getPost } from "@/lib/action";
import ParamsMO from "@/components/params/paramsMO";

const Imagem = async ({ params }) => {
  const tecnica = params.tecnica.split('-');
  console.log(tecnica);
  const post = await getPost(tecnica[0]);

  if (tecnica[1].startsWith("MO")) {
    const Pontos = post.pontos;
    let objetoAnalise = null;
    
    // Encontrar o objeto de análise correspondente
    Pontos.forEach((ponto) => {
      ponto.tecnicas.forEach((analise) => {
        if (analise.nome_tecnica === tecnica[1]) {
          objetoAnalise = analise;
        }
      });
    });

    if (objetoAnalise) {
      // Gerar uma lista de elementos de imagem
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
      console.log("MO", imagens);

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
        <h1>Gráfico não encontrado</h1>
      </div>
    );
  }
  
  return null; // Retorne null ou algum outro conteúdo se técnica não começar com "MO"
};

export default Imagem;
