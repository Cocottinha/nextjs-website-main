import { getPosts, getUserName } from "@/lib/data"
import styles from "./adminPosts.module.css"
import Link from "next/link";

const AdminPosts = async () => {
    const posts = await getPosts(); 
    return (
        <div className={styles.contaienr}>
            <h1>Posts</h1>
            {posts.map(post => (
                <div className={styles.post} key={post.id}>
                    <div className={styles.detail}>
                        <span className={styles.postTitle}>{getUserName(post.userId)} -- {post.id}</span>
                    </div>
                    <form>
                        <Link className={styles.link} href={`/blog/${post.id}`}>
                            <button className={styles.postButton}>Abrir</button>
                        </Link>
                    </form>
                </div>
            ))}
        </div>
    )
}
export default AdminPosts