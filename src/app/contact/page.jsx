import Image from "next/image"
import styles from "./contact.module.css"

export const metadata = {
    title: 'Contact',
    description: 'Talk to us!',
  }

const Contact = () =>{
    return(
        <div className={styles.container}>         
            <div className={styles.formcontainer}> 
                <h1 className={styles.title}>Entre em Contato</h1>
                <p className={styles.desc}>Verifique nossa disponibilidade para que possamos visitá-lo em breve!</p>             
                <form action="" className={styles.form}>
                    <input type="text" placeholder="Nome e Sobrenome"/>
                    <input type="text" placeholder="Instituição ou Razão Social"/>
                    <input type="text" placeholder="Email"/>
                    <input type="text" placeholder="Telefone ou Celular"/>
                    <input type="text" placeholder="Cidade"/>
                    <textarea name="" id="" cols="38" rows="9" placeholder="Descrição"/>
                    <button className={styles.btnEnviar}>Enviar</button>
                </form>
            </div>
        </div>
    )
}
export default Contact