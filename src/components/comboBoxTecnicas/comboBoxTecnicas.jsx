"use client"
import { useState } from "react";
import styles from "./comboBoxTecnicas.module.css";

export default function ComboBox({ pontos, setSortedPosts }) {
    
    const [selectedOption, setSelectedOption] = useState('1');
    console.log(pontos)
    const handleSelectChange = (event) => {
        const option = event.target.value;
        setSelectedOption(option);

        switch (option) {
            case '1':
                setSortedPosts(pontos);
                break;
            case '2':
                filterByTechnique("MO");
                break;
            case '3':
                filterByTechnique("FTIR");
                break;
            case '4':
                filterByTechnique("XRF");
                break;
            default:
                break;
        }
    };

    const filterByTechnique = (technique) => {
        if (!Array.isArray(pontos)) {
            console.log("pontos não é um array");
            return;
        }

        const filteredPosts = pontos.filter(ponto => {
            return ponto.AnaliseTecnica.some(tecnica => tecnica.nomeDaTecnica.startsWith(technique));
        });
        setSortedPosts(filteredPosts);
    };

    return (
        <div className={styles.button}>
            <h3>Filtro:</h3>
            <select value={selectedOption} id="filters" onChange={handleSelectChange}>
                <option value="1">Todas</option>
                <option value="2">MO</option>
                <option value="3">FTIR</option>
                <option value="4">XRF</option>
            </select>
        </div>
    );
}
