"use client"
import { useState } from "react";
import styles from "./comboBoxTecnicas.module.css";

export default function ComboBoxTecnicas({ pontos, setSortedPosts, onSelectChange }) {
    
    const [selectedOption, setSelectedOption] = useState('Todas');

    const handleSelectChange = (event) => {
        const option = event.target.value;
        setSelectedOption(option);
        onSelectChange(option)

        switch (option) {
            case 'Todas':
                setSortedPosts(pontos);
                break;
            case 'MO':
                filterByTechnique("MO");
                break;
            case 'FTIR':
                filterByTechnique("FTIR");
                break;
            case 'XRF':
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
            <h3>Filtrar:</h3>
            <select value={selectedOption} id="filters" onChange={handleSelectChange}>
                <option value="Todas">Todas</option>
                <option value="MO">MO</option>
                <option value="FTIR">FTIR</option>
                <option value="XRF">XRF</option>
            </select>
        </div>
    );
}
