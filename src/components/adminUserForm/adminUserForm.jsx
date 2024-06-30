"use client"
import { addUser } from "@/lib/action";
import styles from "./adminUserForm.module.css"
import {useFormState} from "react-dom"

const AdminUserForm = () =>{
    const [state, formAction] = useFormState(addUser,undefined);
    return(
        <form action={formAction} className={styles.container}>
            <h1>
                Add New User
            </h1>
            <input type="text"name="username" placeholder="Nome de Usuário" />
            <input type="email"name="email" placeholder="E-mail" />
            <input type="password" name="password" placeholder="Senha" />
            <select name="isAdmin">
                <option value="false">É Admin?</option>
                <option value="false">Não</option>
                <option value="true">Sim</option>
            </select>
            <button>Adicionar</button>
            {state && state.error}
        </form>
    )
}
export default AdminUserForm