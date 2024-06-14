"use client"
import { login } from "@/lib/action"
import styles from "./loginForm.module.css"
import Link from "next/link"
import { useFormState } from "react-dom";

const LoginForm = () => {

  const [state, formAction] = useFormState(login, undefined)

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state?.error}
      <Link href={"/forgot-password"}>Forgot Password?</Link>
    </form>
  )
}
export default LoginForm