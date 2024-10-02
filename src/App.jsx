import { useState } from 'react'
import Header from "./Header";
import Resultados from "./Resultados";
import './App.css'
import Error from './Error';
import CONFIG from "./config/config";
import { mock1 } from './constants/mock.js';

function App() {
  const [queryLat, setLat] = useState(CONFIG.default_lat) //latitud inicial
  const [queryLon, setLon] = useState(CONFIG.default_lon)//Longitud inicial
  const [resultado, setResultado] = useState(null);//Estado para almacenar resultados
  const [error, setError] = useState(""); // Estado para manejar errores

const callServer = async (param)=> {
  if(CONFIG.use_server){
    try{
      //Creamos una cadena de consulta con latitud, longitud y API key
      //Como por ejemplo: https://api.example.com/weather?lat=40.416775&lon=-3.703790&appid=YOUR_API_KEY
      let queryparams ="?key="+ CONFIG.api_key + "&q="+queryLat + "," + queryLon +"&days="+CONFIG.num_items_query;     
       //Realizamos la solicitud al server usando fetch
      const response = await fetch(`${CONFIG.server_url}${queryparams}`);
      const data = await response.json(); 

      if(response.status===200){
        console.log("200 OK");
        setResultado(data);//seteamos la data del server si la solicitud es exitosa
        setError(null);
      }else{
        setResultado(null);
        setError({ code: data.error.code, message: data.error.message });//manejar errores si la solicitud no es exitosa
        console.log("Error response data:", data);
      }
      
    }catch(error){
      console.log(error);
      setResultado(null);
      setError({ message: error.message });//manejar errores si la solicitud no es exitosa
      console.log("Catch error:", error.message);
    }
  }else{
    setResultado(mock1);
    setError(null)
    console.log("Using mock data:", mock1);

  }
}
  return (
      <div id="main">
        <Header />
        <h2 id="titulo">EL TIEMPO</h2>

        <div>
        <label>Latitud:</label>
        <input type="number" id="latitud" placeholder='default_lat' value={queryLat} onChange={e=>setLat(e.target.value)} /> 
        </div>

        <div>
        <label>Longitud:</label>
        <input type="number" id="longitud" placeholder='default_lon' value={queryLon} onChange={e=>setLon(e.target.value)} /> 
        </div>

        <button id="buscar" onClick={()=>callServer()}> Buscar</button>
        {resultado && <Resultados numitems={CONFIG.num_items_show} datos={resultado} />}
         {/* Renderizar Resultados si resultado existe */}
        {error && <Error code={error.code} message={error.message} />} {/* Renderizar Error si error existe */}
      </div>
      
  );
}

export default App
//<div><input type="text" id="query" placeholder="Texto a buscar" value={query} onChange={e=>setQuery(e.target.value)}></input></div>

