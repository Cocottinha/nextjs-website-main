const ParamsFTIR = (objeto) =>{
    return(       
        <div className={styles.parametros}>
            <h1>Parâmetros: </h1>
            <p>Tempo{'(ms)'}: {objeto.objeto.tempo}</p>
            <p>Intervalo: {objeto.objeto.intervalo}</p>
            <p>Resolução: {objeto.objeto.resolucao}</p>
            <p>Data: {objeto.objeto.data}</p>
            <p>Comentário: {objeto.objeto.comentario}</p>
            <p>Resultado: {objeto.objeto.resultado}</p>
            <p>Tonalidade: {objeto.objeto.tonalidade}</p>
        </div>
        
    )
}
export default ParamsFTIR