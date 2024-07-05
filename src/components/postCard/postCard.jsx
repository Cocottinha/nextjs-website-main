import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

const PostCard = ({post}) => {
    return(
        <Link className={styles.link} href={`/blog/${post.projeto_id}`}>
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgCont}>
                    <Image src={"/operarios.jpg"} alt={post.nome_imagem} fill className={styles.img} priority={true}/>
                </div>
                <span className={styles.date}>{post.created_at.toString().slice(0,10)}</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.nome_imagem}</h1>
                {/* <p className={styles.desc}>{post.desc}</p>                 */}
            </div>
        </div>
        </Link>
    )
}

export default PostCard