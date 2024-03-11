import styles from "./about.module.css"
import Image from "next/image"

export const metadata = {
    title: 'About',
    description: 'About us and our work!',
  }

const About = () =>{
    return(
        
        <div className={styles.container}>
            <div className={styles.textContainer}>                
                <h1 className={styles.title}>Nós somos uma equipe de cientistas, pesquisadores e desenvolvedores!</h1>
                <p className={styles.desc}>
                    Apartir de 2019, ano da fundação do Lab.Mov, dedicamos nosso tempo para a análise físico-química de obras de arte e patrimônio histórico-cultural.
                    Com uma equipe ampla, possuindo técnicos das mais diversas áreas da ciência.
                </p>
                <div className={styles.boxes}>
                    <div className={styles.box}>
                        <h1>15 +</h1>
                        <p>Museus Visitados</p>
                    </div>
                    <div className={styles.box}>   
                       <h1>50 +</h1>           
                       <p>Obras Analisadas</p>
                    </div>
                    <div className={styles.box}>
                        <h1>4 +</h1>
                        <p>Anos de Experiência</p>
                    </div>
                </div>
            </div>
            <div className={styles.imgContainer}>
                <Image
                    src="/e8ccc8fa-c46b-4418-bcf0-e19e80ea977b.jpg"
                    alt="Trabalho de Campo"
                    priority
                    unoptimized={true}
                    width={1430} height={953} className={styles.imgabout}/>
            </div>
        </div>
    )
}
export default About