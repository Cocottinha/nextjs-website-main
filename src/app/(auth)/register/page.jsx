import styles from "./register.module.css"
import RegisterForm from "@/components/registerForm/registerForm"

const Register = () => {
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Register</h1>
                <RegisterForm/>
            </div>
        </div>
    )
}
export default Register