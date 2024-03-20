"use client"
import { useEffect } from "react"
import styles from "./pontoAnalise.module.css"

const PontoAnalise = ({IdPonto, X, Y, largImg, altImg}) => {
    useEffect(() => {
        const divCoord = document.getElementById(IdPonto);
        const a = largImg / 700;
        const b = altImg / 700;
        
        if(divCoord){
            divCoord.style.left = (X/a) + "px";
            divCoord.style.top = (Y/b) + "px";
            console.log(X/a , Y/b)
        }
    },[IdPonto, X, Y]);
    return(
        <div className={styles.ponto} id={IdPonto}>Ponto_{IdPonto}</div>
    )
}
export default PontoAnalise