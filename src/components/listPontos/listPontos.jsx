"use client"
import Link from "next/link"
import styles from "./listPontos.module.css"
import { useState } from "react"
import ComboBox from "../comboBoxTecnicas/comboBoxTecnicas"

const ListPontos = ({ data, slug }) => {

    const [selectedPonto, setSelectedPonto] = useState(null)
    const [isTecnicaListVisible, setIsTechniquesListVisible] = useState(false)
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Todas');

    const handlePontoClick = (pontoId) => {
        setSelectedPonto(pontoId);
        setIsTechniquesListVisible(true);
        setTimeout(() => {
            let window = document.getElementById("hide");
            if (window) {
                window.style.display = "block";
            }
        }, 0);
        
    };

    const handleFilteredPostsChange = (filteredPosts) => {
        setFilteredPosts(filteredPosts);
        setIsTechniquesListVisible(false);
    };

    const handleSelectChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className={styles.container}>
            <ComboBox pontos={data.Pontos} setSortedPosts={handleFilteredPostsChange} onSelectChange={handleSelectChange} />
            <div className={styles.caixa}>
                <div className={styles.row}>
                    <h2>Pontos</h2>
                    <div className={styles.column}>
                        <ul>
                            {filteredPosts.map((ponto) => (
                                <li
                                    key={ponto.IdPonto}
                                    onClick={() => handlePontoClick(ponto.IdPonto)}
                                    className={selectedPonto === ponto.IdPonto ? styles.selected : ""}
                                >
                                    {ponto.Nome}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {isTecnicaListVisible && (
                    <div className={styles.row} id="hide" hidden>
                        <h2>Técnicas</h2>
                        <div className={styles.column}>
                            <ul>
                                {selectedPonto &&
                                    data.Pontos.find((ponto) => ponto.IdPonto === selectedPonto).AnaliseTecnica.map(
                                        (tecnica, index) => tecnica.nomeDaTecnica.startsWith(selectedOption) && ( 
                                            <Link
                                                target="blank_"
                                                href={{
                                                    pathname: "/grafico/" + slug + "-" + tecnica.nomeDaTecnica,
                                                }}
                                            >
                                                <li key={index}>{tecnica.nomeDaTecnica}</li>
                                            </Link>
                                        )
                                    )}
                            </ul>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
export default ListPontos