import styles from "@/app/home.module.css"
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return <div className={styles.container}>
    <div className={styles.textbox}>
      <h1 className={styles.title}>Horas Complementares</h1>
      <p className={styles.desc}>
        Sistema de horas Complementares!<br/>
        Seu site para cadastrar e acompanhar suas horas complementares!
      </p>
    </div>
  </div>;
};

export default Home;