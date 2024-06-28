"use client"
import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css"
import {useFormState} from "react-dom"

const AdminPostsForm = ({userId}) =>{
    const [state, formAction] = useFormState(addPost,undefined);
    return(
        <form action={formAction} className={styles.container}>
            <h1>
                Add New Post
            </h1>
            <input type="hidden"name="userId" value={userId}/>
            <input type="text"name="dimensao" placeholder="Dimensão" />
            <input type="text"name="atividade" placeholder="Atividade" />
            <input type="text"name="horas" placeholder="Horas" />
            <textarea type="text"name="descricao" placeholder="Descrição" rows={10}/>
            <button>Adicionar</button>
            {state && state.error}
        </form>
    )
}
export default AdminPostsForm