"use client"
import Image from "next/image"
import PontoAnalise from "../pontoAnalise/pontoAnalise"
import ListPontosETecnicas from "../listPontos&Tecnicas/listPontos&Tecnicas"
import styles from "./postView.module.css"
import { useState } from "react"
import ComboBox from "../comboBox/comboBox"
import Link from "next/link"

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
      {post.img &&
        <div className={styles.imgContainer} id="imgContainer">
          <Image src={post.img} alt={post.desc} width={700} height={700} className={styles.img} priority={true} />
          {post.Pontos.map((ponto) => (
            <PontoAnalise key={ponto.IdPonto} IdPonto={ponto.IdPonto} X={ponto.X} Y={ponto.Y} largImg={post.X} altImg={post.Y} onClick={handlePontoClick} />
          ))}
        </div>}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.NomeImagem}</h1>
        <div className={styles.detail}>
          {/* {post && 
                    (<Suspense fallback={<div>Loading...</div>}>
                        <PostUser userId = {post.userId}></PostUser>
                    </Suspense>
                    )} */}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Data da Publicação</span>
            <span className={styles.detailValue}>{post.createdAt.toString().slice(0, 10)}</span>
          </div>
        </div>
        <div className={styles.cont}>
          <ComboBox pontos={post.Pontos} setSortedPosts={handleFilteredPostsChange} onSelectChange={handleSelectChange} />
          {/* <ListPontosETecnicas data={post} slug={post._id}/> */}
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
                      post.Pontos.map((ponto) => (
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
            {isTecnicaListVisible && (
              <div className={styles.row} id="hide" hidden>
                <h2>Técnicas:</h2>
                <div className={styles.column}>
                  <ul>
                    {selectedPonto &&
                      post.Pontos.find((ponto) => ponto.IdPonto === selectedPonto).AnaliseTecnica.map(
                        (tecnica, index) => (
                          tecnica.nomeDaTecnica.startsWith(selectedOption) || selectedOption === 'Todas' ? (
                            <Link
                              target="blank_"
                              href={{
                                pathname: "/grafico/" + post._id + "-" + tecnica.nomeDaTecnica,
                              }}
                              key={index}
                            >
                              <li>{tecnica.nomeDaTecnica}</li>
                            </Link>
                          ) : null
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
  )
}

export default PostView;