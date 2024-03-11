import LoginForm from "@/components/loginForm/loginForm"
import styles from "./login.module.css"
const Login = () => {
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}
export default Login