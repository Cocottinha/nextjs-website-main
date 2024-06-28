import { getPosts, getUser, getUserName } from "@/lib/data"
import styles from "./adminPosts.module.css"

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
                        <button className={styles.postButton}>Abrir Hora</button>
                    </form>
                </div>
            ))}
        </div>
    )
}
export default AdminPosts