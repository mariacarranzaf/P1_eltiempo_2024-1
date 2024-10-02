// Definir un componente funcional llamado "Error" que toma props como argumento
export default function Error(props) {
    return (
        <div id="error">
            <h3>Error</h3>
            <h5>Descripción: Obtenido error al llamar al API. Código {props.code}</h5>
            <h5>Mensaje del servidor: {props.message}</h5>
        </div>
    )
}
//Cremaos una ventana por si hay error, las props las cremaos 
//nosotros en App con los paramtros que queremos que aparezcan en cada caso