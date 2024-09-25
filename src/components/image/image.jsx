import Image from 'next/image';

const ImagePlot = ({ params }) => {
  if (params) {
    const imagens = params.imagensEAumentos.map((i, index) => (
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
  return{

  }

}
}

export default ImagePlot;