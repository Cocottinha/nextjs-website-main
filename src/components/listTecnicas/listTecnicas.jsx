"use client"
import styles from "./listTecnicas.module.css"
import Link from "next/link"

const ListTecnicas = ({data, isTecnicaListVisible, selectedOption, selectedPonto, slug}) =>{
  return(
    <div>
      {isTecnicaListVisible && (
          <div className={styles.row} id="hide" hidden>
            <h2>Técnicas:</h2>
            <div className={styles.column}>
              <ul>
                {selectedPonto &&
                  data.Pontos.find((ponto) => ponto.IdPonto === selectedPonto).AnaliseTecnica.map(
                    (tecnica, index) => (
                      tecnica.nomeDaTecnica.startsWith(selectedOption) || selectedOption === 'Todas' ? (
                        <Link
                          target="blank_"
                          href={{
                            pathname: "/grafico/" + slug + "-" + tecnica.nomeDaTecnica,
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
  )
}

export default ListTecnicas;