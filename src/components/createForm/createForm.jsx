"use client";
import { useState } from "react";
import styles from "./createForm.module.css";
import { register } from "@/lib/action";

const CreateForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(event.target);
    const { name, email, password, c_password } = Object.fromEntries(formData);

    try {
      const result = await register(name, email, password, c_password);
      if (result.Sucesso) {
        setSuccessMessage(result.Mensagem);
      } else {
        setErrorMessage(result.Mensagem);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "Create Account failed");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" name="name" required />
      <input type="email" placeholder="Email" name="email" required />
      <input type="password" placeholder="Password" name="password" required />
      <input type="password" placeholder="Confirm Password" name="c_password" required />
      {errorMessage && <div className={styles.error}><p>{errorMessage}</p></div>}
      {successMessage && <div className={styles.success}><p>{successMessage}</p></div>}
      <button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create"}
      </button>
    </form>
  );
};

export default CreateForm;