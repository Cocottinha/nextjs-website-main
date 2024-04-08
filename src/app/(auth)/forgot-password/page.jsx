import NewPassword from "@/components/newPasswordForm/newPasswordForm"
import styles from "./changePassword.module.css"

const ForgotPassword = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Change Password</h1>
                <NewPassword />
            </div>
        </div>
    )
}
export default ForgotPassword