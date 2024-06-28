import Link from "next/link"
import styles from "./postCard.module.css"

const PostCard = ({post}) => {
    return(
        <Link className={styles.link} href={`/blog/${post._id}`}>
        <div className={styles.container}>
            <div className={styles.top}>
                <span className={styles.date}>{post.createdAt.toString().slice(0,10)}</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.dimensao}</h1>
                <p className={styles.desc}>{post.atividade}</p>                 
                <p className={styles.desc}>{post.horas}</p>
                <p className={styles.desc}>{post.desc}</p>
                <p className={styles.desc}>{post.atividade}</p>
                {post.pendente ? (
                    <p>Pendente</p>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
        </Link>
    )
}

export default PostCard