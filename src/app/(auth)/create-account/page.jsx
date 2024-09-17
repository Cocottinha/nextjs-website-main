"use client"
import styles from "./create.module.css"
import CreateForm from "@/components/createForm/createForm"
const CreateAccount = () => {
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Create Account</h1>
                <CreateForm/>
            </div>
        </div>
    )
}
export default CreateAccount