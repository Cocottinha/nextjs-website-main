"use client"

import styles from "./listPontos.module.css"
import { useState } from "react"
import ComboBox from "../comboBoxTecnicas/comboBoxTecnicas"
import ListTecnicas from "../listTecnicas/listTecnicas"

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

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div className={styles.container}>
      <ComboBox pontos={data.Pontos} setSortedPosts={handleFilteredPostsChange} onSelectChange={handleSelectChange} />
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
        <div>
          <ListTecnicas data={data} isTecnicaListVisible={isTecnicaListVisible} selectedOption={selectedOption} selectedPonto={selectedPonto} slug={slug}/>
        </div>
      </div>
    </div>
  )
}
export default ListPontos