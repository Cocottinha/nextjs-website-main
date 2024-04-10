"use client"

import ListTecnicas from "../listTecnicas/listTecnicas"
import styles from "./listPontos.module.css"
import { useState } from "react"

const ListPontos = ({ filteredPosts, data, selectedOption, slug }) => {
  const post = data;
  const selected = selectedOption;
  const slugr = slug;
  const [selectedPonto, setSelectedPonto] = useState(null)
  const [isTecnicaListVisible, setIsTechniquesListVisible] = useState(false)

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

  return (
    <div className={styles.container}>
      <div className={styles.caixa}>
        <div className={styles.row}>
          <h2>Pontos:</h2>
          <div className={styles.column}>
            <ul>
              {filteredPosts.length > 0 ?
                (
                  filteredPosts.map((ponto) => (
                    <li
                      key={ponto.IdPonto}
                      onClick={() => handlePontoClick(ponto.IdPonto)}
                      className={selectedPonto === ponto.IdPonto ? styles.selected : ""}
                    >
                      {ponto.Nome}
                    </li>
                  ))
                ) : (
                  selectedOption === "Todas" ? (
                    data.Pontos.map((ponto) => (
                      <li
                        key={ponto.IdPonto}
                        onClick={() => handlePontoClick(ponto.IdPonto)}
                        className={selectedPonto === ponto.IdPonto ? styles.selected : ""}
                      >
                        {ponto.Nome}
                      </li>
                    ))
                  ) : null
                )}
            </ul>
          </div>
        </div>
        <ListTecnicas data={post} isTecnicaListVisible={isTecnicaListVisible} selectedOption={selected} slug={slugr} selectedPonto={selectedPonto} />
      </div>
    </div>

  )
}
export default ListPontos;