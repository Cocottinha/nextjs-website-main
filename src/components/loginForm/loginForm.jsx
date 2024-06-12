"use client"
import { login } from "@/lib/action"
import styles from "./loginForm.module.css"
import Link from "next/link"

const LoginForm = () => {

  return (
    <form className={styles.form} action={login}>
      <input type="text" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      <Link href={"/forgot-password"}>Forgot Password?</Link>
    </form>
  )
}
export default LoginForm