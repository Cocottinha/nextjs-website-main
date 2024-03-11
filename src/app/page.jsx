import styles from "@/app/home.module.css"
import Image from "next/image";
import React from "react";

const Home = () => { 
  return <div className={styles.container}>
    <div className={styles.textbox}>
      <h1 className={styles.title}>Nº1 do Brasil!</h1>
      <p className={styles.desc}>
        1º Equipe Nacional a utilizar e dominar a tecnologia de MA-XRF!<br/> Sediado no Campus IFRJ-Paracambi!<br/>
        A Equipe do Laboratório Móvel se mostra influente e uma potência na área das análises físico-químicas de obras de arte!
      </p>
      <div className={styles.buttons}>
        <button className={styles.button}>Learn More</button>
        <button className={styles.button}>Contact</button>
      </div>
      <h4>
          Orgãos de Fomento/Parceiros:
      </h4>
      <div className={styles.brands}>
        <div className={styles.brandImg}>
          <Image src={'/ibram.png'} width={110} height={40} />
        </div>
        <div className={styles.brandImg}>
          <Image src={'/ifrj.png'} width={120} height={40}/>
        </div>
        <div className={styles.brandImg}>
          <Image src={'/liscomp.png'} width={155} height={40}/>
        </div>
        <div className={styles.brandImg}>
          <Image src={'/cnpq.png'} width={125} height={40}/>
        </div>
        <div className={styles.brandImg}>
          <Image src={'/faperj.jfif'} width={100} height={40}/>
        </div>
      </div>
    </div>
    <div className={styles.imgcontainer}>
      <Image src="/lbmovel.jpg" priority unoptimized={true} alt="" width={700} height={450} className={styles.heroImg}></Image>
    </div>
  </div>;
};

export default Home;