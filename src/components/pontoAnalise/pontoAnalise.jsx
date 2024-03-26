"use client"
import { useEffect, useState } from "react";
import styles from "./pontoAnalise.module.css";

const PontoAnalise = ({IdPonto, X, Y, largImg, altImg}) => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });
    
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        if (typeof window !== 'undefined') {
            handleResize();
            window.addEventListener("resize", handleResize);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []); 
    
    useEffect(() => {
        if (typeof window === 'undefined') return; 

        const divCoord = document.getElementById(IdPonto);
        let a, b, y;

        switch (true) {
            case (windowSize.width < 476):
                y = (340*100)/largImg;
                a = largImg / 340;
                b = altImg / (altImg * (y/100));
                break;
            case (windowSize.width < 641):
                y = (435*100)/largImg;
                a = largImg / 435;
                b = altImg / (altImg * (y/100));
                break;
            case (windowSize.width < 769):
                y = (600*100)/largImg;
                a = largImg / 600;
                b = altImg / (altImg * (y/100));
                break;
            case (windowSize.width < 1024):
                y = (728*100)/largImg;
                a = largImg / 728;
                b = altImg / (altImg * (y/100));
                break;
            case (windowSize.width < 1260):
                y = (984*100)/largImg;
                a = largImg / 984;
                b = altImg / (altImg * (y/100));
                break;
            default:
                a = largImg / 700;
                b = altImg / 700;
        }
        
        if(divCoord){
            divCoord.style.left = (X/a) + "px";
            divCoord.style.top = (Y/b) + "px";
        }
    }, [windowSize, IdPonto, X, Y, largImg, altImg]);
    
    return (
        <div className={styles.ponto} id={IdPonto}>Ponto_{IdPonto}</div>
    );
};
export default PontoAnalise;
