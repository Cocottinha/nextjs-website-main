"use client"
import styles from "@/components/footer/footer.module.css"
const Footer = () => {
    return(
        <div className={styles.container}>
            <div className={styles.logo}>Lab.Mov</div>    
            <div className={styles.text}>Laboratório Móvel. Todos os Direitos Reservados.</div>
        </div>
    )
}
export default Footer