"use client"
import Link from "next/link"
import styles from "./listPontos.module.css"
import { useState } from "react"
import ComboBox from "../comboBoxTecnicas/comboBoxTecnicas"

const ListPontos = ({ data, slug }) => {
    const [selectedPonto, setSelectedPonto] = useState(null)

    const handlePontoClick = (pontoId) => {
        setSelectedPonto(pontoId);
        let window = document.getElementById("hide");
        window.style.display = "block"
    };

    return (
        <div className={styles.caixa}>
            <div className={styles.row}>
                <h2>Pontos</h2>
                <div className={styles.column}>
                    <ul>
                        {data.Pontos.map((ponto) => (
                            <li key={ponto.IdPonto}
                                onClick={() => handlePontoClick(ponto.IdPonto)}
                                className={selectedPonto === ponto.IdPonto ? styles.selected : ""}>
                                {ponto.Nome}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.row}>
                <h2 id="hide" hidden>Técnicas</h2>
                <div className={styles.column}>
                <ul>
                    {selectedPonto &&
                        data.Pontos
                            .find((ponto) => ponto.IdPonto === selectedPonto)
                            .AnaliseTecnica.map((tecnica, index) => (
                                <Link target="blank_" href={{
                                    pathname: '/grafico/' + slug + '-' + tecnica.nomeDaTecnica,
                                  }}>
                                    <li key={index}>
                                        {tecnica.nomeDaTecnica}
                                    </li>
                                </Link>
                            ))}
                </ul>
                </div>
            </div>
        </div>
    )
}
export default ListPontos