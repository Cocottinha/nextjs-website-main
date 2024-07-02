import { Suspense } from "react"
import styles from "./page.module.css"
import AdminPosts from "@/components/adminPosts/adminPosts"
import AdminPostsForm from "@/components/adminPostForm/adminPostForm"
import AdminUsers from "@/components/adminUsers/adminUsers"
import AdminUserForm from "@/components/adminUserForm/adminUserForm"
import { auth } from "@/lib/auth"
import { getPosts } from "@/lib/data"
const Admin = async() => {

    
    const session = await auth();
    const posts = await getPosts();
    return(
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.columns}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminPosts posts={posts}/>
                    </Suspense>
                </div>
                <div className={styles.columns}>
                    <AdminPostsForm userId={session.user.id}/>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.columns}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminUsers/>
                    </Suspense>
                </div>
                <div className={styles.columns}>
                    <AdminUserForm/>
                </div>
            </div>
        </div>
    )
}

export default Admin