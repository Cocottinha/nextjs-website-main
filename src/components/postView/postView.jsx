"use client";
import { useState } from "react";
import Image from "next/image";
import PontoAnalise from "../pontoAnalise/pontoAnalise";
import styles from "./postView.module.css";
import Link from "next/link";
import ComboBoxTecnicas from "../comboBoxTecnicas/comboBoxTecnicas";

const PostView = ({ post }) => {
  const [isTecnicaListVisible, setIsTechniquesListVisible] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Todas');
  const [selectedPonto, setSelectedPonto] = useState(null);
  const [imageSrc, setImageSrc] = useState(`/ftp/${post.projeto_id}/${post.nome_imagem}${post.extensao_imagem}`);
  const [imgError, setImgError] = useState(false);

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

  const handleImgError = () => {
    setImgError(true);
    setImageSrc(`/ftp/notfound.png`); // Substitua pelo caminho da imagem de fallback
  };

  return (
    <div className={styles.container}>
      {post && (
        <div className={styles.imgContainer} id="imgContainer">
          <Image
            src={imageSrc}
            alt={post.nome_imagem}
            width={post.largura_imagem}
            height={post.altura_imagem}
            className={styles.img}
            priority={true}
            onError={handleImgError}
          />
          {post.pontos.map((ponto) => (
            <PontoAnalise
              key={ponto.ponto_id}
              IdPonto={ponto.ponto_id}
              NomePonto={ponto.nome_ponto}
              X={ponto.coordenada_x}
              Y={ponto.coordenada_y}
              largImg={post.largura_imagem}
              altImg={post.altura_imagem}
              onClick={handlePontoClick}
            />
          ))}
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.nome_projeto}</h1>
        <div className={styles.detail}>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Autor:</span>
            <span className={styles.detailValue}>{post.nome_autor}</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Nome:</span>
            <span className={styles.detailValue}>{post.nome_projeto}</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Ano:</span>
            <span className={styles.detailValue}>{post.ano_obra}</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Estilo:</span>
            <span className={styles.detailValue}>{post.estilo}</span>
          </div>
        </div>
        <div className={styles.contTop}>
          <ComboBoxTecnicas pontos={post.pontos} setSortedPosts={handleFilteredPostsChange} onSelectChange={handleSelectChange} />
          <div className={styles.cont}>
            <div className={styles.row}>
              <h2>Pontos:</h2>
              <div className={styles.column}>
                <ul>
                  {filteredPosts.length > 0 ? (
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
                    {selectedPonto &&
                      post.pontos.find((ponto) => ponto.ponto_id === selectedPonto).tecnicas.map(
                        (tecnica, index) => (
                          tecnica.nome_tecnica.startsWith("MO") ? (
                            <Link
                              target="blank_"
                              href={`/imagem/${post.projeto_id}-${tecnica.nome_tecnica}`}
                              key={index}
                            >
                              <li>{tecnica.nome_tecnica}</li>
                            </Link>
                          ) : (
                            (tecnica.nome_tecnica.startsWith("FTIR") || tecnica.nome_tecnica.startsWith("XRF") || selectedOption === 'Todas') && (
                              <Link
                                target="blank_"
                                href={`/grafico/${post.projeto_id}-${tecnica.nome_tecnica}`}
                                key={index}
                              >
                                <li>{tecnica.nome_tecnica}</li>
                              </Link>
                            )
                          )
                        )
                      )
                    }
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
