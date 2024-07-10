"use client"
import Image from "next/image"
import PontoAnalise from "../pontoAnalise/pontoAnalise"
import styles from "./postView.module.css"
import { useState } from "react"
import Link from "next/link"
import ComboBoxTecnicas from "../comboBoxTecnicas/comboBoxTecnicas"

const PostView = ({ post }) => {
  const [isTecnicaListVisible, setIsTechniquesListVisible] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Todas');
  const [selectedPonto, setSelectedPonto] = useState(null)

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
      {post.projeto &&
        <div className={styles.imgContainer} id="imgContainer">
          <Image src={"/flamengo.jpeg"} alt={post.projeto.nome_imagem} width={700} height={700} className={styles.img} priority={true} />
          {post.pontos.map((ponto) => (
            <PontoAnalise key={ponto.ponto_id} IdPonto={ponto.ponto_id} X={ponto.coordenada_x} Y={ponto.coordenada_y} largImg={post.projeto.largura_imagem} altImg={post.projeto.altura_imagem} onClick={handlePontoClick} />
          ))}
        </div>}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.projeto.nome_imagem}</h1>
        <div className={styles.detail}>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Data da Publicação</span>
            <span className={styles.detailValue}>{post.projeto.createdAt.toString().slice(0, 10)}</span>
          </div>
        </div>
        <div className={styles.contTop}>
          <ComboBoxTecnicas pontos={post.pontos} setSortedPosts={handleFilteredPostsChange} onSelectChange={handleSelectChange} />
          <div className={styles.cont}>
            <div className={styles.row}>
              <h2>Pontos:</h2>
              <div className={styles.column}>
                <ul>
                  {filteredPosts.length > 0 ?
                    (
                      filteredPosts.map((ponto) => (
                        <li
                          key={ponto.ponto_id}
                          onClick={() => handlePontoClick(ponto.ponto_id)}
                          className={selectedPonto === ponto.ponto_id ? styles.selected : ""}
                        >
                          {ponto.nome_ponto}
                        </li>
                      ))
                    ) : (
                      selectedOption === "Todas" ? (
                        post.pontos.map((ponto) => (
                          <li
                            key={ponto.ponto_id}
                            onClick={() => handlePontoClick(ponto.ponto_id)}
                            className={selectedPonto === ponto.ponto_id ? styles.selected : ""}
                          >
                            {ponto.nome_ponto}
                          </li>
                        ))
                      ) : null
                    )}
                </ul>
              </div>
            </div>
            {isTecnicaListVisible && (
              <div className={styles.row} id="hide" hidden>
                <h2>Técnicas:</h2>
                <div className={styles.column}>
                  <ul>
                    {selectedPonto && (() => {
                      const ponto = post.pontos.find((p) => p.ponto_id === selectedPonto);
                      if (!ponto) return null;

                      const todasTecnicas = []
                        .concat(ponto.tecnicas_ftir || [])
                        .concat(ponto.tecnicas_mo || [])
                        .concat(ponto.tecnicas_xrf || []);

                      const tecnicasFiltradas = todasTecnicas.filter(tecnica =>
                        selectedOption === 'Todas' || tecnica.nome_tecnica.startsWith(selectedOption)
                      );

                      return tecnicasFiltradas.map((tecnica, index) => (
                        <Link
                          target="blank_"
                          href={{
                            pathname: "/grafico/" + post.projeto.projeto_id + "-" + tecnica.nome_tecnica,
                          }}
                          key={index}
                        >
                          <li>{tecnica.nome_tecnica}</li>
                        </Link>
                      ));
                    })()}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostView;