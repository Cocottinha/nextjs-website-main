import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

const PostCard = ({post}) => {
    return(
        <Link className={styles.link} href={`/blog/${post._id}`}>
        <div className={styles.container}>
            <div className={styles.top}>
                {post.img && <div className={styles.imgCont}>
                    <Image src={post.img} alt={post.desc} fill className={styles.img} priority={true}/>
                </div>}
                <span className={styles.date}>{post.createdAt.toString().slice(0,10)}</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.NomeImagem}</h1>
                {/* <p className={styles.desc}>{post.desc}</p>                 */}
            </div>
        </div>
        </Link>
    )
}

export default PostCard