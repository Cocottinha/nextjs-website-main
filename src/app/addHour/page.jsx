import AdminPostsForm from "@/components/adminPostForm/adminPostForm"
import styles from "./addHour.module.css"
import { auth } from "@/lib/auth";

const AddHour = async() => {
    const session = await auth();
    return(
        <div className={styles.lds}>
            <AdminPostsForm userId={session.user.id}/>
        </div>    
    )
}
export default AddHour
