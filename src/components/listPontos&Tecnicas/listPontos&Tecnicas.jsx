"use client"

import styles from "./listPontos&Tecnicas.module.css"
import { useState } from "react"
import ComboBox from "../comboBoxTecnicas/comboBoxTecnicas"
import ListPontos from "../listPontos/listPontos"

const ListPontosETecnicas = ({ data, slug }) => {
  const dados = data;
  const slugr = slug;
  //const [isTecnicaListVisible, setIsTechniquesListVisible] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Todas');

  const handleFilteredPostsChange = (filteredPosts) => {
    setFilteredPosts(filteredPosts);
    //setIsTechniquesListVisible(false);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div className={styles.container}>
      <ComboBox pontos={data.Pontos} setSortedPosts={handleFilteredPostsChange} onSelectChange={handleSelectChange} />
      <div className={styles.caixa}>
        <ListPontos data={dados} filteredPosts={filteredPosts} selectedOption={selectedOption} slug={slugr}/>
      </div>
    </div>
  )
}
export default ListPontosETecnicas;