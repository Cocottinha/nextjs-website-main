import Link from "next/link";
import styles from "./postCard.module.css";

const PostCard = ({ post }) => {
  let statusMessage = "";
  if (post.aprovado) {
    statusMessage = "Aprovado";
  } else if (!post.aprovado && !post.pendente) {
    statusMessage = "Reprovado";
  } else {
    statusMessage = "Pendente";
  }

  return (
    <Link href={`/blog/${post._id}`}>
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.date}>Data: {post.createdAt.toString().slice(0, 10)}</span>
        </div>
        <div className={styles.bottom}>
          <h1 className={styles.title}>{post._id}</h1>
          <p className={styles.desc}>Dimensão: {post.dimensao}</p>
          <p className={styles.desc}>Atividade: {post.atividade}</p>
          <p className={styles.desc}>Horas: {post.horas}</p>
          <p className={styles.desc}>Descrição: {post.descricao}</p>
          
          <p className={styles.status}>Status: {statusMessage}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
