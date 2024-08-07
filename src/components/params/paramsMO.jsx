import styles from "./params.module.css"

const ParamsMO = (objeto) =>{
    return(       
        <div className={styles.parametros}>
            <h1>Parâmetros: </h1>
            <p>Objetiva: {objeto.objeto.objetiva}</p>
            <p>Aumento: {objeto.objeto.aumento}</p>
            <p>Data: {objeto.objeto.updated_at}</p>
            <p>Comentário: {objeto.objeto.comentario}</p>
            <p>Resultado: {objeto.objeto.resultado}</p>
            <p>Tonalidade: {objeto.objeto.tonalidade}</p>
        </div>
        
    )
}
export default ParamsMO