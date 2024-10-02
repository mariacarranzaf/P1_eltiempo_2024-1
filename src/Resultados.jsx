export default function Resultados(props){
    return(
    <div id="resultados">
        <p id="ciudad">Ciudad:{props.datos.location.name}</p>
        <p id="pais">País:{props.datos.location.country}</p>
        <p id="timezone">Timezone:{props.datos.location.tz_id}</p>
        <p><b>El tiempo de los próximos días:</b></p>
        <div className="tarjetas-contenedor">
           
        {/* Mapear los datos obtenidos de las propiedades y mostrar cada elemento como un elemento de lista (li) */}
                {props.datos.forecast.forecastday.map((item, index) => {
                    if(index < props.numitems){//Comprobamos que se renderizan el numero indicado
                        return(
                        <div id="tarjeta" key={index}>
                            <p><b>{new Date(item.date_epoch * 1000).toLocaleDateString()}</b></p>
                            <p><img className="tiempoimg" 
                                    src={item.day.condition.icon} 
                                    alt={`Icono del clima para ${new Date(item.date_epoch * 1000).toLocaleDateString()}`}
                            /></p> 
        
                            <p>Temp: {(item.day.avgtemp_c)}Cº</p>
                            <p>Humedad: {(item.day.avghumidity)}%</p>
                            <p>Viento: {(item.day.maxwind_kph)}km/h</p>
                         </div> 
                        );
                    }else{
                        return null;
                    }
                })}
        </div> 
    </div>

    );
}
//El objetivo es recorrer todos los objetos de la api, como un array, y ahi devolver los resultados que se deseen.
//Aqui hacemos el metodo map y ponemos el formato que queremos que aparezcan los resultados