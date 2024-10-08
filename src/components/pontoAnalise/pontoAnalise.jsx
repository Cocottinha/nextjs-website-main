"use client"
import { useEffect, useState } from "react";
import styles from "./pontoAnalise.module.css";

const PontoAnalise = ({ IdPonto,NomePonto, X, Y, largImg, altImg, onClick }) => {
    const handleClick = () =>{
        const pontoData = IdPonto;
        onClick(pontoData);
    }
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
                y = (340) / largImg;
                a = largImg / 340;
                b = altImg / (altImg * (y));
                break;
            case (windowSize.width < 641):
                y = (435) / largImg;
                a = largImg / 435;
                b = altImg / (altImg * (y));
                break;
            case (windowSize.width < 769):
                y = (600) / largImg;
                a = largImg / 600;
                b = altImg / (altImg * (y));
                break;
            case (windowSize.width < 1024):
                y = (728) / largImg;
                a = largImg / 728;
                b = altImg / (altImg * (y));
                break;
            case (windowSize.width < 1260):
                y = (984) / largImg;
                a = largImg / 984;
                b = altImg / (altImg * (y));
                break;
            case (windowSize.width < 1367):
                y = (820) / largImg;
                a = largImg / 820;
                b = altImg / (altImg * (y));
                break;    
            case (windowSize.width < 1537):
                y = (906) / largImg;
                a = largImg / 906;
                b = altImg / (altImg * (y));
                break;
            default:
                a = largImg / 1024;
                b = altImg / (altImg*(1024/largImg));
        }

        if (divCoord) {
            divCoord.style.left = (X / a) + "px";
            divCoord.style.top = (Y / b) + "px";
        }
    }, [windowSize, IdPonto, X, Y, largImg, altImg]);

    return (
        <div className={styles.ponto} id={IdPonto} onClick={handleClick}>{NomePonto}</div>
    );
};
export default PontoAnalise;
