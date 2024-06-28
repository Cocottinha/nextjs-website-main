import styles from "@/components/footer/footer.module.css"
const Footer = () => {
    return(
        <div className={styles.container}>
            <div className={styles.logo}>Horas Complementares</div>    
            <div className={styles.text}>FAETERJ. By Lucas Cotta.</div>
        </div>
    )
}
export default Footer