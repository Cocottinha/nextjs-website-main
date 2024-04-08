"use client"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { changePassword } from "@/lib/action"
import styles from "./newPasswordForm.module.css"
import { useState } from "react";

const NewPassword = () => {
  const [state, formAction] = useFormState(changePassword, undefined)
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== password) {
      console.log(newPassword,"//", password)
      setError('As senhas não coincidem!');
      return;
    }

    setPassword('');
    setNewPassword('');
    setError('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} action={formAction}>
      <input
        type="email"
        placeholder="email"
        name="email"
        required
      />
      <input
        type="password"
        placeholder="new password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="confirm password"
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Mudar Senha</button>
      {error && <div>{error}</div>}
      {state?.error}
    </form>
  )
}
export default NewPassword
