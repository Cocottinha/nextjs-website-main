"use client"
//import { useRouter } from "next/router";
import { changePassword } from "@/lib/action";
import styles from "./newPasswordForm.module.css";
import { useState } from "react";

const NewPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      await changePassword(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Nova senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirmar nova senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Mudar Senha</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default NewPassword;
