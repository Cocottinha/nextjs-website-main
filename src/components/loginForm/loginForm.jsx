"use client"
import { useState } from "react";
import { login } from "@/lib/action"; // Certifique-se de que o caminho esteja correto
import styles from "./loginForm.module.css";
import Link from "next/link";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    setErrorMessage("");
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const result = await login(email, password);
      if (result.token) {
        localStorage.setItem('auth-token', result.token); // Sinaliza que o token foi atualizado
        window.location.href = '/'; // Redirecionar após login bem-sucedido
      }
    } catch (error) {
      setErrorMessage(error.message || 'Login failed');
    } finally {
      setPending(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" placeholder="email" name="email" required />
      <input type="password" placeholder="password" name="password" required />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <LoginButton pending={pending} />
      <Link href={"/forgot-password"}>Forgot Password?</Link>
    </form>
  );
};

const LoginButton = ({ pending }) => {
  const handleClick = (event) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick}>
      {pending ? "Logging in..." : "Login"}
    </button>
  );
};

export default LoginForm;
