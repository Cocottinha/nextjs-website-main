import ImagePlot from "@/components/imagePlot/imagePlot";
import styles from "./imagem.module.css";
import { getPost } from "@/lib/action";

const Imagem = async ({ params }) => {
  const tecnica = params.tecnica.split('-');
  const post = await getPost(tecnica[0]);
  return (
    <div className={styles.container}>
      <ImagePlot params={params} post={post} tecnica={tecnica}/>
    </div>
  );
};

export default Imagem;
