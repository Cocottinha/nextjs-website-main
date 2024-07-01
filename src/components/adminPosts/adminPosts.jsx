import { getPosts, getUserName } from "@/lib/data"
import styles from "./adminPosts.module.css"
import Link from "next/link";

const AdminPosts = async () => {
  const posts = await getPosts();
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map(post => (
        <div className={styles.post} key={post.id}>
          <div className={styles.detail}>
            <span className={styles.postTitle}>
              {getUserName(post.userId)} -- {post.id}
            </span>
          </div>
          <div className={styles.groupButton}>
            <Link className={styles.link} href={`/blog/${post.id}`}>
              <div className={styles.postButton}>Abrir</div>
            </Link>
            {post.pendente && (
              <>
                {post.aprovado === true && (
                  <div className={styles.approved}>Aprovado</div>
                )}
                {post.aprovado === false && (
                  <div className={styles.reproved}>Reprovado</div>
                )}
                {post.aprovado === null && (
                  <div className={styles.pending}>Pendente</div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
export default AdminPosts
