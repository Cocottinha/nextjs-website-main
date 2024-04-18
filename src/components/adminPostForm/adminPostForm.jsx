// "use client"
// import { addPost } from "@/lib/action";
// import styles from "./adminPostForm.module.css"
// import {useFormState} from "react-dom"

// const AdminPostsForm = ({userId}) =>{
//     const [state, formAction] = useFormState(addPost,undefined);
//     return(
//         <form action={formAction} className={styles.container}>
//             <h1>
//                 Add New Post
//             </h1>
//             <input type="hidden"name="userId" value={userId}/>
//             <input type="text"name="NomeImagem" placeholder="Nome da Imagem" />
//             <textarea type="text"name="desc" placeholder="Descrição" rows={10}/>
//             <input type="text"name="img" placeholder="Imagem" />
//             <button>Adicionar</button>
//             {state && state.error}
//         </form>
//     )
// }
// export default AdminPostsForm