import styles from "./params.module.css"

const ParamsXRF = (objeto) =>{
    return(
        
        <div className={styles.parametros}>
            <h1>Parâmetros:</h1>
            <p>Tempo{'(ms)'}: {objeto.objeto.tempo}</p>
            <p>Colimador: {objeto.objeto.colimador}</p>
            <p>Calibração: {objeto.objeto.calibracao}</p>
            <p>Corrente{'(mA)'}: {objeto.objeto.corrente}</p>
            <p>Tensão{'(V)'}: {objeto.objeto.tensao}</p>
            <p>Data: {objeto.objeto.data}</p>
            <p>Comentário: {objeto.objeto.comentario}</p>
            <p>Resultado: {objeto.objeto.resultado}</p>
            <p>Tonalidade: {objeto.objeto.tonalidade}</p>
        </div>
        
    )
}
export default ParamsXRF