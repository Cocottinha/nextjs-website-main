import { getPosts } from "@/lib/data"
import styles from "./adminPosts.module.css"

const AdminPosts = async () =>{

    const posts = await getPosts()

    return(
        <div className={styles.contaienr}>
            <h1>Posts</h1>
        </div>
    )
}
export default AdminPosts