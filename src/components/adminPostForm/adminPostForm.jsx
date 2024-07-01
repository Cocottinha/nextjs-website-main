"use client"
import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css"
import { useFormState } from "react-dom"
import { useState } from "react";

const AdminPostsForm = ({ userId }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [pending, setPending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPending(true);
        setErrorMessage("");
        const formData = new FormData(event.target);
        const { dimensao, atividade, descricao, horas, userId } = Object.fromEntries(formData)

        try {
            const result = await addPost(dimensao, atividade, descricao, horas, userId);
            console.log(result)
            window.alert(result.message)
        } catch (error) {
            setErrorMessage(error.message || 'Add failed');
        } finally {
            setPending(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <h1>
                Add New Post
            </h1>
            <input type="hidden" name="userId" value={userId} />
            <input type="text" name="dimensao" placeholder="Dimensão" />
            <input type="text" name="atividade" placeholder="Atividade" />
            <input type="text" name="horas" placeholder="Horas" />
            <textarea type="text" name="descricao" placeholder="Descrição" rows={10} />
            <div>{errorMessage && <p>{errorMessage}</p>}</div>
            <AddButton pending={pending} />
        </form>
    )
}

const AddButton = ({ pending }) => {
    const handleClick = (event) => {
        if (pending) {
            event.preventDefault();
        }
    };

    return (
        <button aria-disabled={pending} type="submit" onClick={handleClick}>
            {pending ? "Adding in..." : "Add Hour"}
        </button>
    );
};
export default AdminPostsForm